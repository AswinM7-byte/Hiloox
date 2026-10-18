"""Create an alpha matte for the supplied orb, preserving its opaque interior.
Requires local OpenCV, Pillow, NumPy and imageio-ffmpeg in .media-tools.
No generated/replacement frames: all RGB content comes from the source video.
"""
import sys
from pathlib import Path
import subprocess
import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.media-tools'))
import imageio_ffmpeg

source = ROOT / 'public/videos/yona-annotator.mp4'
output = ROOT / 'public/videos/yona-sphere-alpha.webm'
capture = cv2.VideoCapture(str(source))
w, h = int(capture.get(3)), int(capture.get(4))
fps = capture.get(cv2.CAP_PROP_FPS)
yy, xx = np.mgrid[:h, :w]
radius = np.sqrt((xx - 640) ** 2 + (yy - 360) ** 2)
# Interior stays opaque, including dark blue folds. The exterior glow alone
# receives a brightness-derived matte, confined well clear of the watermark.
core = np.clip((280 - radius) / 15, 0, 1)
extent = np.clip((365 - radius) / 35, 0, 1)
cmd = [imageio_ffmpeg.get_ffmpeg_exe(), '-y', '-v', 'error', '-f', 'rawvideo',
       '-pix_fmt', 'rgba', '-s', f'{w}x{h}', '-r', str(fps), '-i', '-',
       '-an', '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '0',
       '-crf', '20', '-deadline', 'good', '-cpu-used', '3', '-row-mt', '1',
       '-auto-alt-ref', '0', str(output)]
encoder = subprocess.Popen(cmd, stdin=subprocess.PIPE)
count = 0
try:
    while True:
        ok, bgr = capture.read()
        if not ok: break
        rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB).astype(np.float32)
        glow = np.clip((rgb.max(axis=2) - 18) / 160, 0, 1) * extent
        alpha = np.maximum(core, glow) * extent
        # Unpremultiply only the exterior glow; opaque sphere pixels are intact.
        clean = np.clip((rgb - (1 - alpha[..., None]) * np.array([6, 6, 12])) / np.maximum(alpha[..., None], .01), 0, 255)
        rgba = np.dstack([clean.astype(np.uint8), (alpha * 255).astype(np.uint8)])
        rgba[alpha == 0, :3] = 0
        if count == 0:
            Image.fromarray(rgba).save(ROOT / 'public/videos/yona-sphere-alpha-poster.webp', lossless=True)
        encoder.stdin.write(rgba.tobytes())
        count += 1
finally:
    capture.release(); encoder.stdin.close()
if encoder.wait(): raise RuntimeError('Alpha encoding failed')
print(f'Encoded {count} source frames at {w}x{h}, {fps} fps; {output.stat().st_size:,} bytes')
