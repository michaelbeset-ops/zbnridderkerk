# 360-panorama van de showroom. Gebruik: python3 maak.py <map met foto's> <uitmap> 1137 0.35 0.20, daarna ontwaas.py.
# Alleen de foto's die vanaf het midden zijn genomen (10,11,0..5) vormen de ronde; foto 9 (van dichterbij, bij de
# ingang) vult verkleind het smalle stuk tussen 5 en 10. Foto 6, 7 en 8 zijn van een andere plek en vallen af.
import cv2, numpy as np, sys, os, functools
print=functools.partial(print,flush=True)
src, uit = sys.argv[1], sys.argv[2]
volgorde = ['15.24.54.jpeg','15.24.54 (1).jpeg','15.24.55.jpeg','15.24.55 (1).jpeg','15.24.55 (2).jpeg','15.24.55 (3).jpeg','15.24.55 (4).jpeg','15.24.55 (5).jpeg','15.24.56.jpeg','15.24.56 (1).jpeg','15.24.56 (2).jpeg','15.24.56 (3).jpeg']
RONDE=[10,11,0,1,2,3,4,5]; VUL=9
orig={k:cv2.imread(os.path.join(src,'WhatsApp Image 2026-10-12 at '+volgorde[k])) for k in RONDE+[VUL]}
H,W=orig[0].shape[:2]
sift=cv2.SIFT_create(15000)
def warp(im,f):
    K=np.array([[f,0,W/2],[0,f,H/2],[0,0,1]],np.float32); wp=cv2.PyRotationWarper('cylindrical',f)
    _,img=wp.warp(im,K,np.eye(3,dtype=np.float32),cv2.INTER_LANCZOS4,cv2.BORDER_REFLECT)
    _,m=wp.warp(np.full((H,W),255,np.uint8),K,np.eye(3,dtype=np.float32),cv2.INTER_NEAREST,cv2.BORDER_CONSTANT)
    return img,m
def kenmerken(img,m): return sift.detectAndCompute(cv2.cvtColor(img,cv2.COLOR_BGR2GRAY),cv2.erode(m,np.ones((15,15))))
def matches(ka,da,kb,db):
    mm=cv2.BFMatcher().knnMatch(db,da,k=2); g=[x for x,y in mm if x.distance<0.8*y.distance]
    return np.float32([kb[x.queryIdx].pt for x in g]), np.float32([ka[x.trainIdx].pt for x in g])
def verschuiving(A,B):
    pb,pa=matches(*A,*B); d=pa-pb; best=(0,0)
    for k in range(len(d)):
        if not (100<d[k,0]<1700) or abs(d[k,1])>200: continue
        c=(np.abs(d-d[k]).max(1)<8).sum()
        if c>best[0]: best=(c,k)
    sel=np.abs(d-d[best[1]]).max(1)<8; return np.median(d[sel],0)   # positie van B in A-coordinaten
def gelijkvormig(A,B):
    pb,pa=matches(*A,*B); M,inl=cv2.estimateAffinePartial2D(pb,pa,ransacReprojThreshold=5,maxIters=20000); return M,int(inl.sum())
def opbouw(f):
    war={k:warp(orig[k],f) for k in RONDE+[VUL]}; kd={k:kenmerken(*war[k]) for k in war}
    pos=[np.zeros(2)]
    for a,b in zip(RONDE[:-1],RONDE[1:]): pos.append(pos[-1]+verschuiving(kd[a],kd[b]))
    M59,n59=gelijkvormig(kd[5],kd[VUL]); M910,n910=gelijkvormig(kd[VUL],kd[10])
    # positie van de kopie van foto 10 na een volle ronde, via 5 -> 9 -> 10
    A=np.vstack([M59,[0,0,1]])@np.vstack([M910,[0,0,1]])
    eind=pos[-1]+A[:2,2]
    return war,pos,eind,M59,(n59,n910),A,kd
# brandpuntsafstand waarbij de ronde sluit (lineair tussen 1125 en 1150)
f=float(sys.argv[3]) if len(sys.argv)>3 else 1137.0
war,pos,eind,M59,n,_,kd=opbouw(f); P=2*np.pi*f
print('f',f,'ronde',round(eind[0]),'P',round(P))
pos=np.array(pos); sx=P/eind[0]; dy=eind[1]
# rek de ronde zacht op tot precies 360 graden en verdeel de verticale drift lineair
pos[:,0]*=sx; pos[:,1]-=dy*pos[:,0]/P
# lijst van beelden: ronde, dan 9 (vervormd met de gelijkvormigheid t.o.v. 5), dan foto 10 nog eens na de ronde
imgs=[];masks=[];corners=[]
for k,p in zip(RONDE,pos):
    img,m=war[k]; imgs.append(img); masks.append(m); corners.append((int(round(p[0])),int(round(p[1]))))
img9,m9=war[VUL]; h9,w9=m9.shape
GRENS=float(sys.argv[5]) if len(sys.argv)>5 else 0.0
m9=m9.copy(); m9[:,:int(w9*GRENS)]=0
p5=pos[RONDE.index(5)]; p10=pos[0]+np.array([P,0])
b1,a1=matches(*kd[5],*kd[VUL]); b2,a2=matches(*kd[10],*kd[VUL])
bron=np.vstack([b1,b2]); doel=np.vstack([a1+p5,a2+p10])
Hm,inl=cv2.findHomography(bron,doel,cv2.RANSAC,6.0,maxIters=20000)
i1=inl[:len(b1)].sum(); i2=inl[len(b1):].sum(); print('homografie 9: inliers op 5',int(i1),'op 10',int(i2))
hoeken=cv2.perspectiveTransform(np.float32([[[0,0]],[[w9,0]],[[0,h9]],[[w9,h9]]]),Hm).reshape(-1,2)
x0,y0=np.floor(hoeken.min(0)).astype(int); x1,y1=np.ceil(hoeken.max(0)).astype(int)
T=np.array([[1,0,-x0],[0,1,-y0],[0,0,1]],float)@Hm
imgs.append(cv2.warpPerspective(img9,T,(x1-x0,y1-y0),flags=cv2.INTER_AREA,borderMode=cv2.BORDER_REFLECT))
masks.append(cv2.warpPerspective(m9,T,(x1-x0,y1-y0),flags=cv2.INTER_NEAREST)); corners.append((int(x0),int(y0)))
img,m=war[10]; imgs.append(img); masks.append(m); corners.append((int(round(pos[0][0]+P)),int(round(pos[0][1]))))
N=len(imgs)
# belichting/kleur: globale log-gains per kanaal over alle overlappende paren
def overlap(i,j):
    (xa,ya),(xb,yb)=corners[i],corners[j]; ha,wa=masks[i].shape; hb,wb=masks[j].shape
    X0,X1=max(xa,xb),min(xa+wa,xb+wb); Y0,Y1=max(ya,yb),min(ya+ha,yb+hb)
    if X1-X0<40 or Y1-Y0<40: return None
    pa=imgs[i][Y0-ya:Y1-ya,X0-xa:X1-xa].reshape(-1,3).astype(float); pb=imgs[j][Y0-yb:Y1-yb,X0-xb:X1-xb].reshape(-1,3).astype(float)
    ok=((masks[i][Y0-ya:Y1-ya,X0-xa:X1-xa]>0)&(masks[j][Y0-yb:Y1-yb,X0-xb:X1-xb]>0)).reshape(-1)
    ok&=(pa.max(1)<245)&(pb.max(1)<245)&(pa.min(1)>8)&(pb.min(1)>8)
    if ok.sum()<500: return None
    return np.log(pa[ok].mean(0)+1)-np.log(pb[ok].mean(0)+1)
idx=list(range(N-1))+[0]   # laatste beeld is dezelfde foto als het eerste
rijen=[]
for i in range(N):
    for j in range(i+1,N):
        if idx[i]==idx[j]: continue
        d=overlap(i,j)
        if d is not None: rijen.append((idx[i],idx[j],d))
gains=np.ones((N-1,3))
for c in range(3):
    A=np.zeros((len(rijen)+1,N-1)); v=np.zeros(len(rijen)+1)
    for r,(i,j,d) in enumerate(rijen): A[r,i]=-1; A[r,j]=1; v[r]=d[c]
    A[-1,:]=1; gains[:,c]=np.exp(np.linalg.lstsq(A,v,rcond=None)[0])
print('gains',np.round(gains,2).tolist())
imgs=[np.clip(im.astype(np.float32)*gains[idx[i]][None,None,:],0,255).astype(np.uint8) for i,im in enumerate(imgs)]
# Tafel: de onderste helft tussen de randen van beeld 5 (foto 1) komt alleen uit dat beeld,
# zodat er geen naad door de tafel en stoelen loopt (die staan dichtbij en verschuiven tussen foto's).
T=5; tx0=corners[T][0]+90; tx1=corners[T][0]+masks[T].shape[1]-90
for i in (4,6):
    c=corners[i]; m=masks[i].copy(); h,w=m.shape
    yy=np.arange(h)+c[1]; xx=np.arange(w)+c[0]
    # beeld 6 (met de deur) helemaal, beeld 4 alleen onder de horizon
    rij=yy>=(corners[T][1]+masks[T].shape[0]*0.48 if i==4 else -1e9); kol=(xx>=tx0)&(xx<tx1)
    m[np.ix_(rij,kol)]=0
    if i==4: m[:,xx>=tx0+650]=0   # deur alleen uit beeld 5
    masks[i]=m
# Ingang: het ruitpaneel alleen uit foto 9; beeld 7 (foto 5) stopt waar foto 9 begint.
m9=masks[8]; kolom9=np.where(m9[m9.shape[0]//2]>0)[0]; links9=corners[8][0]+kolom9.min()+60
c=corners[7]; m=masks[7].copy(); xx=np.arange(m.shape[1])+c[0]; m[:,xx>links9]=0; masks[7]=m
print('foto 5 stopt bij',links9)
# naden en meerbandig mengen
sc=float(sys.argv[4]) if len(sys.argv)>4 else 0.5
ki=[cv2.resize(i,None,fx=sc,fy=sc).astype(np.float32) for i in imgs]
km=[cv2.UMat(cv2.resize(m,None,fx=sc,fy=sc,interpolation=cv2.INTER_NEAREST)) for m in masks]
kc=[(int(c[0]*sc),int(c[1]*sc)) for c in corners]
km=cv2.detail_GraphCutSeamFinder('COST_COLOR_GRAD').find(ki,kc,km)
naad=[cv2.resize(cv2.dilate(m.get(),None),(masks[i].shape[1],masks[i].shape[0]),interpolation=cv2.INTER_LINEAR_EXACT)&masks[i] for i,m in enumerate(km)]
sizes=[(m.shape[1],m.shape[0]) for m in masks]
bl=cv2.detail_MultiBandBlender(); bl.setNumBands(7)
dst=cv2.detail.resultRoi(corners=corners,sizes=sizes); bl.prepare(dst)
for i in range(N): bl.feed(imgs[i].astype(np.int16),naad[i],corners[i])
res,resm=bl.blend(None,None); res=cv2.convertScaleAbs(res)
# een volle ronde uitsnijden, vanaf het midden van foto 10
xs=corners[0][0]+masks[0].shape[1]//2-dst[0]; Pi=int(round(P))
strook=res[:,xs:xs+Pi]; sm=resm[:,xs:xs+Pi]
dekking=(sm>0).mean(1); rows=np.where(dekking>0.95)[0]
strook=strook[rows.min():rows.max()+1]; gat=(sm[rows.min():rows.max()+1]==0).astype(np.uint8)*255
print('gat %',round(gat.mean()/2.55,2))
strook=cv2.inpaint(strook,cv2.dilate(gat,np.ones((7,7),np.uint8)),9,cv2.INPAINT_TELEA)
# nabewerking
strook=cv2.fastNlMeansDenoisingColored(strook,None,3,3,5,15)
f32=strook.astype(np.float32); gem=f32.reshape(-1,3).mean(0); f32*=gem.mean()/gem*0.5+0.5
strook=np.clip(f32,0,255).astype(np.uint8)
lab=cv2.cvtColor(strook,cv2.COLOR_BGR2LAB); l,a,b=cv2.split(lab)
l=cv2.createCLAHE(clipLimit=1.15,tileGridSize=(8,40)).apply(l); strook=cv2.cvtColor(cv2.merge([l,a,b]),cv2.COLOR_LAB2BGR)
blur=cv2.GaussianBlur(strook,(0,0),1.6); strook=cv2.addWeighted(strook,1.3,blur,-0.3,0)
cv2.imwrite(f'{uit}/pano8.jpg',strook,[cv2.IMWRITE_JPEG_QUALITY,92]); print('pano',strook.shape)
