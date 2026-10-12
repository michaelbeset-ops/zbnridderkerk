import sys, os, cv2, warnings
from stitching import Stitcher
src, uit = sys.argv[1], sys.argv[2]
volgorde = ['15.24.54.jpeg','15.24.54 (1).jpeg','15.24.55.jpeg','15.24.55 (1).jpeg','15.24.55 (2).jpeg','15.24.55 (3).jpeg','15.24.55 (4).jpeg','15.24.55 (5).jpeg','15.24.56.jpeg','15.24.56 (1).jpeg','15.24.56 (2).jpeg','15.24.56 (3).jpeg']
fs=[os.path.join(src,'WhatsApp Image 2026-10-12 at '+v) for v in volgorde]
opts=dict(detector='sift', nfeatures=10000, medium_megapix=3, range_width=2, warper_type='spherical', wave_correct_kind='horiz', crop=False, confidence_threshold=0.05, final_megapix=4, matches_graph_dot_file=f'{uit}/graph5.dot')
with warnings.catch_warnings(record=True) as w:
    warnings.simplefilter('always')
    try:
        pano=Stitcher(**opts).stitch(fs)
        cv2.imwrite(f'{uit}/v5.jpg', pano, [cv2.IMWRITE_JPEG_QUALITY, 88]); print('v5', pano.shape, 'waarschuwing' if w else 'alles mee')
    except Exception as e: print('FOUT', e)
