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
GOLD = (139, 105, 20)
CREAM = (251, 246, 236)
INK = (34, 34, 34)


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
    img = Image.new("RGB", (W, H), CREAM)
    draw = ImageDraw.Draw(img)

    # border
    margin = 26
    draw.rectangle([margin, margin, W - margin, H - margin], outline=GOLD, width=4)
    inset = margin + 14
    draw.rectangle([inset, inset, W - inset, H - inset], outline=DARKRED, width=1)

    def centered(y, text, font, color):
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        draw.text(((W - w) / 2, y), text, font=font, fill=color)

    f_small = find_font(bold=False, size=26)
    f_names = find_font(bold=True, size=72)
    f_date = find_font(bold=True, size=36)
    f_venue = find_font(bold=False, size=26)

    centered(90, "You're Invited to the Wedding of", f_small, INK)
    centered(150, "Kiran  &  Pavitra", f_names, DARKRED)

    # small diamond ornament (drawn, not a font glyph, to avoid missing-glyph boxes)
    cx, cy, r = W / 2, 300, 9
    draw.line([(cx - 90, cy), (cx - 22, cy)], fill=GOLD, width=2)
    draw.line([(cx + 22, cy), (cx + 90, cy)], fill=GOLD, width=2)
    draw.polygon(
        [(cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)],
        outline=GOLD, width=2,
    )

    centered(360, "Thursday, 26th November 2026", f_date, INK)
    centered(415, "Shree Kavoor Kamakshi Sabhagraha, Kumta", f_venue, INK)

    img.save(os.path.join(ASSETS, "og-image.png"))
    print("saved og-image.png")


if __name__ == "__main__":
    make_qr()
    make_og_image()
