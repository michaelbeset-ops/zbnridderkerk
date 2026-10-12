# Afwerking van het ruwe panorama: JPEG-blokjes dempen, waas eruit op de helderheid, kleur iets voller,
# verscherpen alleen op lichtsterkte en alleen echte randen (drempel), zodat ruis en blokjes niet mee versterkt worden.
import cv2, numpy as np, sys
im=cv2.imread(sys.argv[1])
im=cv2.bilateralFilter(im,5,10,2)                       # blokjes van WhatsApp-compressie, randen blijven
lab=cv2.cvtColor(im,cv2.COLOR_BGR2LAB).astype(np.float32); L,a,b=cv2.split(lab); L/=255
basis=cv2.GaussianBlur(cv2.erode(L,np.ones((41,41))),(0,0),50)   # trage lichte waas
L=(L-0.28*basis)/(1-0.28*basis.clip(0,0.95))
lo,hi=np.percentile(L,0.3),np.percentile(L,99.7); L=np.clip((L-lo)/(hi-lo),0,1)
# lokaal contrast (grote straal, zacht) en verscherpen (kleine straal, met drempel)
gr=cv2.GaussianBlur(L,(0,0),25); L=np.clip(L+0.18*(L-gr),0,1)
kl=cv2.GaussianBlur(L,(0,0),0.9); d=L-kl
d=np.sign(d)*np.maximum(np.abs(d)-0.006,0)              # onder de drempel niets doen
L=np.clip(L+1.35*d,0,1)
a=(a-128)*1.06+128; b=(b-128)*1.06+128
uit=cv2.cvtColor(cv2.merge([L*255,a,b]).clip(0,255).astype(np.uint8),cv2.COLOR_LAB2BGR)
cv2.imwrite(sys.argv[2],uit,[cv2.IMWRITE_JPEG_QUALITY,int(sys.argv[3]) if len(sys.argv)>3 else 93])
