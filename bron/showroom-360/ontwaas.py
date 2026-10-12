# Waas eruit zonder kleurzweem: alleen op de helderheid werken (LAB-L), kleur ongemoeid.
import cv2, numpy as np, sys
im=cv2.imread(sys.argv[1]); lab=cv2.cvtColor(im,cv2.COLOR_BGR2LAB); l,a,b=cv2.split(lab)
L=l.astype(np.float32)/255
# lokale waas = traag variërende lichte laag; trek een deel ervan af en rek weer op
basis=cv2.GaussianBlur(cv2.erode(L,np.ones((31,31))),(0,0),40)
L=(L-0.35*basis)/(1-0.35*basis.clip(0,0.95))
lo,hi=np.percentile(L,0.5),np.percentile(L,99.6); L=np.clip((L-lo)/(hi-lo),0,1)
L=np.power(L,1.05)
l=(L*255).astype(np.uint8)
l=cv2.createCLAHE(clipLimit=1.2,tileGridSize=(6,36)).apply(l)
bl=cv2.GaussianBlur(l,(0,0),1.0); l=cv2.addWeighted(l,1.25,bl,-0.25,0)
# iets meer verzadiging (waas maakt kleuren flets)
a=np.clip((a.astype(np.float32)-128)*1.08+128,0,255).astype(np.uint8); b=np.clip((b.astype(np.float32)-128)*1.08+128,0,255).astype(np.uint8)
cv2.imwrite(sys.argv[2],cv2.cvtColor(cv2.merge([l,a,b]),cv2.COLOR_LAB2BGR),[cv2.IMWRITE_JPEG_QUALITY,92])
