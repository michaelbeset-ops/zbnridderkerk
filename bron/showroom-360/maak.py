import cv2, numpy as np, sys, os, functools
print=functools.partial(print,flush=True)
src, uit = sys.argv[1], sys.argv[2]
volgorde = ['15.24.54.jpeg','15.24.54 (1).jpeg','15.24.55.jpeg','15.24.55 (1).jpeg','15.24.55 (2).jpeg','15.24.55 (3).jpeg','15.24.55 (4).jpeg','15.24.55 (5).jpeg','15.24.56.jpeg','15.24.56 (1).jpeg','15.24.56 (2).jpeg','15.24.56 (3).jpeg']
ims=[cv2.imread(os.path.join(src,'WhatsApp Image 2026-10-12 at '+v)) for v in volgorde]
H,W=ims[0].shape[:2]; n=len(ims); f=1300.0
K=np.array([[f,0,W/2],[0,f,H/2],[0,0,1]],np.float32)
wp=cv2.PyRotationWarper('cylindrical',f)
war=[]
for im in ims:
    c,img=wp.warp(im,K,np.eye(3,dtype=np.float32),cv2.INTER_LANCZOS4,cv2.BORDER_REFLECT)
    _,m=wp.warp(np.full((H,W),255,np.uint8),K,np.eye(3,dtype=np.float32),cv2.INTER_NEAREST,cv2.BORDER_CONSTANT)
    war.append((img,m))
sift=cv2.SIFT_create(10000)
kd=[sift.detectAndCompute(cv2.cvtColor(a,cv2.COLOR_BGR2GRAY),cv2.erode(m,np.ones((15,15)))) for a,m in war]
def paar(i,j):
    (ka,da),(kb,db)=kd[i],kd[j]
    m=cv2.BFMatcher().knnMatch(da,db,k=2); g=[x for x,y in m if x.distance<0.8*y.distance]
    pa=np.float32([ka[x.queryIdx].pt for x in g]); pb=np.float32([kb[x.trainIdx].pt for x in g]); d=pa-pb
    res=[]
    for k in range(len(d)):
        if not (200<d[k,0]<1500) or abs(d[k,1])>150: continue
        sel=np.abs(d-d[k]).max(1)<8; res.append((sel.sum(),k))
    if not res: return None,0
    c,k=max(res); sel=np.abs(d-d[k]).max(1)<8
    return np.median(d[sel],0),int(c)
sh=[]; betr=[]
for i in range(n):
    s,c=paar(i,(i+1)%n); sh.append(s if s is not None else np.array([0.,0.])); betr.append(c>=20)
    print(i,'dx %.0f dy %.0f stemmen %d'%(sh[-1][0],sh[-1][1],c))
sh=np.array(sh); betr=np.array(betr)
totaal=2*np.pi*f
rest=totaal-sh[betr,0].sum(); nb=(~betr).sum()
print('betrouwbaar',betr.sum(),'rest',round(rest),'per onbetrouwbaar',round(rest/max(nb,1)))
if nb: sh[~betr,0]=rest/nb; sh[~betr,1]=0
else: sh[:,0]*=totaal/sh[:,0].sum()
sh[:,1]-=sh[:,1].mean()   # verticale drift over de ronde wegwerken
np.save(f'{uit}/sh.npy',sh)
# Posities, beeld 0 ook aan het eind (n) voor de rondsluiting
x=np.concatenate([[0],np.cumsum(sh[:,0])]); y=np.concatenate([[0],np.cumsum(sh[:,1])])
idx=list(range(n))+[0]
imgs=[war[k][0] for k in idx]; masks=[war[k][1] for k in idx]
corners=[(int(round(x[i])),int(round(y[i]))) for i in range(n+1)]
sizes=[(m.shape[1],m.shape[0]) for m in masks]
print('stap: # Belichting')
# Belichting gelijktrekken
# Belichting en kleur: per beeld en per kleurkanaal een factor, globaal opgelost over alle buurparen incl. 11->0,
# zodat er geen opstapeling ontstaat. Vergelijk alleen pixels die in beide beelden echt beeld zijn.
def overlap(i,j,dx,dy):
    a_,ma=imgs[i],masks[i]; b_,mb=imgs[j],masks[j]
    h_=a_.shape[0]; w_=a_.shape[1]-dx
    if w_<=50: return None
    ya=slice(max(0,dy),min(h_,h_+dy)); yb=slice(max(0,-dy),max(0,-dy)+(ya.stop-ya.start))
    pa=a_[ya,dx:dx+w_].reshape(-1,3).astype(np.float64); pb=b_[yb,:w_].reshape(-1,3).astype(np.float64)
    ok=((ma[ya,dx:dx+w_]>0)&(mb[yb,:w_]>0)).reshape(-1)
    ok&=(pa.max(1)<245)&(pb.max(1)<245)&(pa.min(1)>8)&(pb.min(1)>8)
    return pa[ok].mean(0),pb[ok].mean(0)
L=np.zeros((n+1,n,3)); rij=0
A_=[];B_=[]
for i in range(n):
    j=i+1; dx_=corners[j][0]-corners[i][0]; dy_=corners[j][1]-corners[i][1]
    o=overlap(i,j,dx_,dy_)
    if o is None: continue
    A_.append((i,j%n,np.log(o[0]+1)-np.log(o[1]+1)))
gains=np.ones((n,3))
for c in range(3):
    M=np.zeros((len(A_)+1,n)); v=np.zeros(len(A_)+1)
    for r,(i,j,d) in enumerate(A_): M[r,i]=-1; M[r,j]=1; v[r]=d[c]
    M[-1,:]=1  # gemiddelde log-gain 0
    sol=np.linalg.lstsq(M,v,rcond=None)[0]; gains[:,c]=np.exp(sol)
print('gains',np.round(gains,2).tolist())
G=list(gains)+[gains[0]]
imgs=[np.clip(im.astype(np.float32)*G[i][None,None,:],0,255).astype(np.uint8) for i,im in enumerate(imgs)]
print('stap: # Naden zoeken')
# Naden zoeken op lage resolutie, dan opschalen
sc=0.35
ki=[cv2.resize(i,None,fx=sc,fy=sc).astype(np.float32) for i in imgs]
km=[cv2.UMat(cv2.resize(m,None,fx=sc,fy=sc,interpolation=cv2.INTER_NEAREST)) for m in masks]
kc=[(int(c[0]*sc),int(c[1]*sc)) for c in corners]
sf=cv2.detail_GraphCutSeamFinder('COST_COLOR_GRAD')
km=sf.find(ki,kc,km)
naad=[cv2.resize(cv2.dilate(m.get(),None),(sizes[i][0],sizes[i][1]),interpolation=cv2.INTER_LINEAR_EXACT)&masks[i] for i,m in enumerate(km)]
print('stap: bl=cv2.detail_MultiB')
bl=cv2.detail_MultiBandBlender(); bl.setNumBands(7)
dst=cv2.detail.resultRoi(corners=corners,sizes=sizes); bl.prepare(dst)
for i in range(n+1): bl.feed(imgs[i].astype(np.int16),naad[i],corners[i])
print('stap: res,resm=bl.blend')
res,resm=bl.blend(None,None); res=cv2.convertScaleAbs(res)
# Een volle ronde uitsnijden: van het midden van beeld 0 tot het midden van de kopie aan het eind
x0=int(round(W/2*0+ (masks[0].shape[1]/2))) - dst[0]
P=int(round(totaal))
strook=res[:,x0:x0+P]; sm=resm[:,x0:x0+P]
rij=(sm>0).mean(1); rows=np.where(rij>0.97)[0]
strook=strook[rows.min():rows.max()+1]
strook=cv2.fastNlMeansDenoisingColored(strook,None,3,3,5,15)
f32=strook.astype(np.float32); gem=f32.reshape(-1,3).mean(0); f32*=gem.mean()/gem*0.5+0.5
strook=np.clip(f32,0,255).astype(np.uint8)
lab=cv2.cvtColor(strook,cv2.COLOR_BGR2LAB); l,a,b=cv2.split(lab)
l=cv2.createCLAHE(clipLimit=1.15,tileGridSize=(8,40)).apply(l); strook=cv2.cvtColor(cv2.merge([l,a,b]),cv2.COLOR_LAB2BGR)
blur=cv2.GaussianBlur(strook,(0,0),1.6); strook=cv2.addWeighted(strook,1.3,blur,-0.3,0)
cv2.imwrite(f'{uit}/pano.jpg',strook,[cv2.IMWRITE_JPEG_QUALITY,92]); print('pano',strook.shape)
