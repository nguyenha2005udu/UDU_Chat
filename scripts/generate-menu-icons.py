"""Generate antialiased menu icons with transparent backgrounds; no dependencies."""
import math
import struct
import zlib
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / 'src/assets/menu'
OUT.mkdir(parents=True, exist_ok=True)


def arc(cx, cy, radius, start, end, steps=24):
    return [(cx + radius * math.cos(math.radians(start + (end-start)*i/steps)),
             cy + radius * math.sin(math.radians(start + (end-start)*i/steps)))
            for i in range(steps+1)]


def circle(cx, cy, radius):
    return arc(cx, cy, radius, 0, 360, 48)


chat = [(6, 4), (18, 4)] + arc(18, 7, 3, -90, 0) + [(21, 15)] + arc(18, 15, 3, 0, 90) + [(10, 18), (4, 21), (4, 17)] + arc(6, 15, 3, 180, 270)[:1] + [(3, 7)] + arc(6, 7, 3, 180, 270)
chat.append(chat[0])
contacts = [circle(9, 8, 3), arc(9, 20, 6, 180, 360), arc(16, 8, 2.6, -90, 90), arc(16, 20, 5, -90, 0)]
bell = [(5, 17), (7, 14), (7, 9)] + arc(12, 9, 5, 180, 360) + [(17, 14), (19, 17), (5, 17)]
gear = []
for i in range(8):
    for angle, radius in [(-15, 7.3), (-10, 9.4), (10, 9.4), (15, 7.3)]:
        theta = math.radians(i*45+angle)
        gear.append((12+radius*math.cos(theta), 12+radius*math.sin(theta)))
gear.append(gear[0])
icons = {
    'chat': [chat, [(8, 9), (16, 9)], [(8, 13), (13, 13)]],
    'contact': contacts,
    'notification': [bell, arc(12, 19, 2, 0, 180), [(12, 2), (12, 4)]],
    'setting': [gear, circle(12, 12, 3)],
}


def segment_distance(x, y, a, b):
    dx, dy = b[0]-a[0], b[1]-a[1]
    length = dx*dx+dy*dy
    t = max(0, min(1, ((x-a[0])*dx+(y-a[1])*dy)/length)) if length else 0
    return (x-a[0]-t*dx)**2+(y-a[1]-t*dy)**2


def chunk(kind, data):
    return struct.pack('!I', len(data))+kind+data+struct.pack('!I', zlib.crc32(kind+data)&0xffffffff)

for name, paths in icons.items():
    segments = [(a,b) for path in paths for a,b in zip(path,path[1:])]
    for scale in (1,2,3):
        size = 24*scale
        # Supersample stroke coverage, including rounded line caps.
        samples = 4
        high = size*samples
        mask = bytearray(high*high)
        for a,b in segments:
            lowx=max(0,int((min(a[0],b[0])-1)*scale*samples))
            highx=min(high,math.ceil((max(a[0],b[0])+1)*scale*samples))
            lowy=max(0,int((min(a[1],b[1])-1)*scale*samples))
            highy=min(high,math.ceil((max(a[1],b[1])+1)*scale*samples))
            for yy in range(lowy,highy):
                for xx in range(lowx,highx):
                    if segment_distance((xx+.5)/(scale*samples),(yy+.5)/(scale*samples),a,b)<=.9**2:
                        mask[yy*high+xx]=255
        raw=bytearray()
        for y in range(size):
            raw.append(0)
            for x in range(size):
                alpha=sum(mask[(y*samples+sy)*high+x*samples+sx] for sy in range(samples) for sx in range(samples))//(samples*samples)
                raw.extend((0,0,0,alpha))
        suffix='' if scale==1 else f'@{scale}x'
        png=b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',struct.pack('!IIBBBBB',size,size,8,6,0,0,0))+chunk(b'IDAT',zlib.compress(raw))+chunk(b'IEND',b'')
        (OUT/f'{name}{suffix}.png').write_bytes(png)
