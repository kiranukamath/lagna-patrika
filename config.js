// ============================================================
// lagna-patrika — single config file
// Edit everything below with your own wedding details.
// Nothing else in the site needs to change for basic use.
// ============================================================
const CONFIG = {
  siteTitle: "Kiran & Pavitra are Getting Married!",

  couple: {
    person1: "Kiran",
    person2: "Pavitra",
  },

  tagline: "We're tying the knot!",
  introLine: "Together with our families, we're so excited to invite you to celebrate our wedding.",

  // Fun, shareable hashtag — shown near the photo-share section
  hashtag: "#KiranWedsPavitra",

  // Wedding date/time — used for the countdown AND the calendar links.
  // Use ISO 8601 with timezone offset. This example is IST (+05:30).
  eventStartISO: "2026-11-26T12:18:00+05:30",
  eventEndISO: "2026-11-26T14:18:00+05:30",
  dateDisplay: "Thursday, 26th November 2026",
  timeDisplay: "Ceremony begins at 12:18 PM (Abhijith Muhurtham)",

  venue: {
    name: "Shree Kavoor Kamakshi Sabhagraha",
    address: "Moorukatte, Kumta",
    // Full Google Maps link (short links like maps.app.goo.gl/... work fine)
    mapsUrl: "https://maps.app.goo.gl/o9BMJJpuHta8LzcY7",
    // QR image should point to the same mapsUrl — see scripts/generate_assets.py
    qrImage: "assets/venue-qr.png",
  },

  // Set to null (or leave url empty) to hide the photo-sharing section entirely.
  photoShare: {
    heading: "Help Us Collect the Memories 📸",
    body: "We'd love to see the day through your eyes. Drop your photos & videos here, and don't forget to use our hashtag!",
    url: "", // TODO: paste your shared Google Photos / Drive album link here
    buttonLabel: "Add Your Photos",
  },

  // Short, warm credit line — a nod to the families, without the full
  // formal invitation wording. Set to "" to hide.
  familyNote: "With the love and blessings of the Kamath & Bhandarkar families",

  // Calendar event details (plain text, used by calendar apps)
  calendar: {
    title: "Kiran & Pavitra's Wedding",
    description: "Join us as Kiran and Pavitra tie the knot! Ceremony begins at 12:18 PM (Abhijith Muhurtham).",
    location: "Shree Kavoor Kamakshi Sabhagraha, Moorukatte, Kumta",
  },
};
