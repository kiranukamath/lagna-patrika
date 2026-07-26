# lagna-patrika 💍

A free, open-source, single-page digital wedding invitation template.
No backend, no build step — just static HTML/CSS/JS, deployable on
GitHub Pages in a few minutes.

Built for sharing the link itself as the invite — paste it into a
WhatsApp message and it shows a proper preview card with your names and
date, no PDF attachment needed.

**Live features:**
- Modern, mobile-first hero with the couple's names + a live countdown
- Venue section with a Google Maps link + QR code
- "Add to Calendar" — Google Calendar link and downloadable `.ics`
  (Apple Calendar / Outlook)
- Optional "share your photos" button + hashtag, linking to an external
  album (Google Photos / Drive) — no file storage needed
- Open Graph tags so the link shows a nice preview card (title, date,
  image) when shared on WhatsApp / iMessage / etc.
- Light & dark mode, mobile responsive

## Quick start (use this for your own wedding)

1. **Fork or use this template** on GitHub (use the "Use this template"
   button, or fork the repo).
2. **Edit `config.js`** — this is the only file most people need to
   touch. Fill in names, date, venue, Google Maps link, calendar
   details, and (optionally) a photo-sharing link.
3. **Regenerate the images** (venue QR code + social preview banner):
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install "qrcode[pil]" Pillow
   python scripts/generate_assets.py
   ```
   This reads the Google Maps URL hardcoded at the top of
   `scripts/generate_assets.py` — update `MAPS_URL` there to match your
   venue's link, and tweak the text in `make_og_image()` to your names
   and date.
4. **Update the Open Graph meta tags** in `index.html`'s `<head>`.
   These control the WhatsApp/social link preview and **must stay as
   static HTML** — link-preview bots don't run JavaScript, so this is
   the one place config.js can't drive automatically. Set `og:url` to
   your final GitHub Pages URL once you know it.
5. **Enable GitHub Pages**: repo Settings → Pages → Deploy from branch
   → `main` → `/ (root)`. Your site will be live at
   `https://<your-username>.github.io/<repo-name>/`.
6. Share the link on WhatsApp! First time you share a URL, WhatsApp
   fetches and caches the preview — if you change `og:image` or
   `og:title` after that, ask recipients to long-press-refresh, or use
   a link-preview debugger (e.g. Facebook's Sharing Debugger) to force
   a re-fetch.

## Project structure

```
lagna-patrika/
├── index.html              # page structure + Open Graph tags
├── config.js                # <-- edit this with your wedding details
├── assets/
│   ├── style.css            # theme (colors, layout, responsive rules)
│   ├── script.js             # countdown, calendar links, rendering logic
│   ├── venue-qr.png          # generated QR code (see below)
│   └── og-image.png          # generated social preview banner
└── scripts/
    └── generate_assets.py    # regenerates the QR code + og-image.png
```

## Customizing the look

Colors and spacing live in `assets/style.css` as CSS variables at the
top of the file (`--gold`, `--darkred`, `--ink`, ...). Swap them for
your own palette — everything else derives from those.

## Photo sharing

There's no file upload/storage built in on purpose — hosting photo
uploads means paying for storage and building moderation. Instead,
point `config.photoShare.url` at a shared **Google Photos** album or
**Google Drive** folder that guests can upload to directly. Set
`config.photoShare` to `null` (or leave `url` empty) to hide the
section entirely.

## License

MIT — do whatever you like with it. If you use this for your own
wedding, congratulations! 🎉
