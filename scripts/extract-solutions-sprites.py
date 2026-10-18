"""Extract only YONA from the user's reference; no reference UI is shipped.
Produces 24fps transparent sprite atlases for a live canvas choreography.
"""
from pathlib import Path
import json
import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/images/solutions-sequence'
OUT.mkdir(exist_ok=True)
cap = cv2.VideoCapture('C:/Users/aswin/Downloads/Solutions_Animation.mp4')
atlas = Image.new('RGBA', (384 * 6, 512 * 4))
areas = []
for idx in range(240):
    ok, frame = cap.read()
    if not ok: raise RuntimeError(f'Missing reference frame {idx}')
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    mask = (((hsv[:, :, 1] > 125) & (hsv[:, :, 2] > 65)) | ((hsv[:, :, 2] > 140) & (hsv[:, :, 1] < 130))).astype('uint8') * 255
    mask[:80] = 0; mask[660:] = 0; mask[:, :60] = 0
    limit = int(np.interp(idx, [0,24,72,96,120,160,239], [480,570,660,650,560,560,560]))
    mask[:, limit:] = 0
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((13,13),np.uint8))
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contour = max(contours, key=cv2.contourArea)
    seed = np.zeros(mask.shape, np.uint8); cv2.drawContours(seed, [contour], -1, 255, -1)
    gc = np.zeros(mask.shape,np.uint8)
    gc[cv2.dilate(seed,np.ones((13,13),np.uint8)) > 0] = 2
    gc[seed > 0] = 3
    gc[cv2.erode(seed,np.ones((5,5),np.uint8)) > 0] = 1
    cv2.grabCut(frame,gc,None,np.zeros((1,65)),np.zeros((1,65)),3,cv2.GC_INIT_WITH_MASK)
    alpha = np.where((gc == 1) | (gc == 3),255,0).astype('uint8')
    # Retain the principal connected character only, excluding any text specks.
    n, labels, stats, _ = cv2.connectedComponentsWithStats(alpha)
    best = 1 + np.argmax(stats[1:,4]); alpha[labels != best] = 0
    x,y,w,h,area = stats[best]; areas.append(int(area))
    alpha = cv2.GaussianBlur(alpha,(3,3),.6)
    rgba = np.dstack([cv2.cvtColor(frame,cv2.COLOR_BGR2RGB),alpha])
    image = Image.fromarray(rgba).crop((int(x)-3,80,int(x+w)+3,660))
    # Constant scale and baseline, not per-frame resizing of the character.
    image = image.resize((round(image.width*.82),476),Image.Resampling.LANCZOS)
    tile = Image.new('RGBA',(384,512)); tile.alpha_composite(image,((384-image.width)//2,20))
    if idx in [0,239]: tile.save(OUT / ('start.webp' if idx == 0 else 'rest.webp'),lossless=True)
    atlas.alpha_composite(tile,((idx%24%6)*384,(idx%24//6)*512))
    if idx%24 == 23:
        atlas.save(OUT / f'atlas-{idx//24}.webp',quality=90,method=6)
        atlas = Image.new('RGBA',(384*6,512*4))
    if idx%24 == 0: print(f'Extracted {idx}/240',flush=True)
cap.release()
(OUT/'sequence.json').write_text(json.dumps({'fps':24,'frames':240,'width':384,'height':512,'columns':6,'framesPerAtlas':24,'atlasCount':10,'minArea':min(areas),'maxArea':max(areas)},indent=2))
print('Complete:',sum(p.stat().st_size for p in OUT.glob('*.webp')),'bytes',flush=True)
