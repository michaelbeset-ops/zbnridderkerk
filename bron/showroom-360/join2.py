import cv2, numpy as np, sys
S=sys.argv[1]
A=cv2.imread(f'{S}/v5.jpg'); B=cv2.imread(f'{S}/v6-0.02.jpg')
Ha,Wa=A.shape[:2]; Hb,Wb=B.shape[:2]
s0,tx0,ty0=0.713,5063.11,203.144     # B links -> A (M1)
s1,tx1,ty1=1.224,-3391.31,-623.557   # B rechts -> A links (M2), afgezien van kleine rotatie
# Schaal per B-kolom lineair van s0 naar s1; X(x) = tx0 + integraal s
xs=np.arange(Wb,dtype=np.float64)
s=s0+(s1-s0)*xs/(Wb-1)
X=tx0+np.concatenate([[0],np.cumsum(s[:-1])])
# periode: kolom xr in B ligt via M2 op A-kolom s1*xr+tx1, en via X op X[xr]; verschil = 360 graden
xr=int(Wb*0.85)
P=X[xr]-(s1*xr+tx1)
# verticale verschuiving lineair: bij x=0 ty0, bij x=xr: ty1 (+ niets, want M2 is in A-ruimte)
ty=ty0+(ty1-ty0)*xs/xr
print('periode',round(P),'A breed',Wa)
P=int(round(P))
# Doek van P breed (360 graden) en hoogte Ha; vul eerst B' (vervormd), dan A eroverheen met zachte overgang
canvas=np.zeros((Ha,P,3),np.float32); w=np.zeros((Ha,P),np.float32)
# B' via remap: voor elke uitvoerkolom u in [X0, X(xr)], zoek x
umin=int(np.ceil(X[0])); umax=int(X[xr])
us=np.arange(umin,umax)
xb=np.interp(us,X,xs)                  # B-kolom voor elke uitvoerkolom
sb=np.interp(xb,xs,s); tyb=np.interp(xb,xs,ty)
yv=np.arange(Ha,dtype=np.float32)[:,None]
mapx=np.repeat(xb[None,:].astype(np.float32),Ha,0)
mapy=((yv-tyb[None,:])/sb[None,:]).astype(np.float32)
Bp=cv2.remap(B,mapx,mapy,cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT)
mB=cv2.remap(np.full(B.shape[:2],255,np.uint8),mapx,mapy,cv2.INTER_NEAREST,borderMode=cv2.BORDER_CONSTANT)
mB=(mB>0)&(Bp.sum(2)>15)
mA=A.sum(2)>15
def plak(img,mask,x0,van,tot,feather):
    # alleen uitvoerkolommen van..tot (absoluut, kan > P), met zachte overgang van feather px aan beide kanten
    h,wd=mask.shape
    for u in range(van-feather,tot+feather):
        i=u-x0
        if i<0 or i>=wd: continue
        g=1.0
        if u<van: g=(u-(van-feather))/feather
        elif u>=tot: g=1-(u-tot)/feather
        c=u%P
        gw=mask[:,i].astype(np.float32)*g
        canvas[:,c]+=img[:,i].astype(np.float32)*gw[:,None]; w[:,c]+=gw
# Naden kiezen waar A en B' het meest op elkaar lijken (kleinste verschil per kolom in de overlap).
def kolomverschil(u0,u1):
    best=None
    for u in range(u0,u1,4):
        ia=u%P; ib=u-umin
        if ia>=Wa or ib<0 or ib>=Bp.shape[1]: continue
        ok=mA[:,ia]&mB[:,ib]
        if ok.mean()<0.35: continue
        d=np.abs(A[:,ia].astype(int)-Bp[:,ib].astype(int)).sum(1)[ok].mean()
        if best is None or d<best[0]: best=(d,u)
    return best
n1=kolomverschil(umin+50,Wa-50)
n2=kolomverschil(P+50,umin+Bp.shape[1]-50)
print('naad1',n1,'naad2',n2)
naad1=n1[1]; naad2=n2[1]
plak(A,mA,0,naad2-P,naad1,30)
plak(Bp,mB,umin,naad1,naad2,30)
out=(canvas/np.maximum(w,1e-6)[:,:,None]).clip(0,255).astype(np.uint8)
geldig=(w>0.05)
rij=geldig.mean(1)
rows=np.where(rij>0.88)[0]
print('rijen',rows.min(),rows.max())
out=out[rows.min():rows.max()+1]
gat=((w[rows.min():rows.max()+1]<0.05)*255).astype(np.uint8)
out=cv2.inpaint(out,cv2.dilate(gat,np.ones((5,5),np.uint8)),7,cv2.INPAINT_TELEA)
print('gat %',round(gat.mean()/2.55,2))
cv2.imwrite(f'{S}/rond360.jpg',out,[cv2.IMWRITE_JPEG_QUALITY,88])
print(out.shape)
