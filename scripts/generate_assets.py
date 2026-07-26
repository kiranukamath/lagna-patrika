"""
Regenerate assets/venue-qr.png and assets/og-image.png from config values.
Run with: ../invitation/output/venv/bin/python generate_assets.py
(or any Python env with qrcode[pil] and Pillow installed)
"""
import qrcode
from PIL import Image, ImageDraw, ImageFont
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "..", "assets")

MAPS_URL = "https://maps.app.goo.gl/o9BMJJpuHta8LzcY7"

DARKRED = (122, 31, 43)
MAROON_DEEP = (58, 15, 21)
GOLD = (201, 162, 75)
CREAM = (251, 246, 236)
BLUSH = (255, 233, 214)
INK = (34, 34, 34)


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def make_qr():
    img = qrcode.make(MAPS_URL, box_size=10, border=2)
    img.save(os.path.join(ASSETS, "venue-qr.png"))
    print("saved venue-qr.png")


def find_font(bold=False, size=40):
    candidates = [
        "/System/Library/Fonts/Supplemental/Georgia Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Times New Roman.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def make_og_image():
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), MAROON_DEEP)
    px = img.load()

    # diagonal-ish gradient: maroon (top-left) -> deep maroon (bottom-right)
    top_left = (138, 39, 52)
    bottom_right = MAROON_DEEP
    for y in range(H):
        for_row = lerp(top_left, bottom_right, y / H)
        for x in range(0, W, 4):  # coarse step for speed, then fill blocks
            c = lerp(for_row, bottom_right, (x / W) * 0.35)
            for dx in range(4):
                if x + dx < W:
                    px[x + dx, y] = c

    draw = ImageDraw.Draw(img)

    def centered(y, text, font, color):
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        draw.text(((W - w) / 2, y), text, font=font, fill=color)

    f_small = find_font(bold=False, size=24)
    f_names = find_font(bold=True, size=76)
    f_date = find_font(bold=True, size=34)
    f_venue = find_font(bold=False, size=24)

    centered(80, "W E ' R E   G E T T I N G   M A R R I E D", f_small, GOLD)
    centered(140, "Kiran  &  Pavitra", f_names, (255, 255, 255))

    cx, cy, r = W / 2, 290, 9
    draw.line([(cx - 90, cy), (cx - 22, cy)], fill=GOLD, width=2)
    draw.line([(cx + 22, cy), (cx + 90, cy)], fill=GOLD, width=2)
    draw.polygon(
        [(cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)],
        outline=GOLD, width=2,
    )

    centered(350, "Thursday, 26th November 2026", f_date, (255, 233, 214))
    centered(400, "Shree Kavoor Kamakshi Sabhagraha, Kumta", f_venue, (243, 217, 201))

    # thin gold frame
    margin = 22
    draw.rectangle([margin, margin, W - margin, H - margin], outline=GOLD, width=2)

    img.save(os.path.join(ASSETS, "og-image.png"))
    print("saved og-image.png")


if __name__ == "__main__":
    make_qr()
    make_og_image()
