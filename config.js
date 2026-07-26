// ============================================================
// lagna-patrika — single config file
// Edit everything below with your own wedding details.
// Nothing else in the site needs to change for basic use.
// ============================================================
const CONFIG = {
  // Shown in the browser tab and used to build the page title
  siteTitle: "Kiran & Pavitra — Wedding Invitation",

  // Top invocation line (optional — leave "" to hide)
  invocation: "|| Shri Kuladevatha Prasanna ||",

  hosts: "Smt. Seethabai & Shri Ullas Vittal Kamath, Shirali",
  hostsLine: "Request your gracious presence with family & friends\non the occasion of the wedding of our Nephew",

  groom: {
    label: "Chi.",
    name: "KIRAN",
    lines: [
      "S/o Smt. Jyothi & Shri. Uday Vittal Kamath, Shirali",
      "Grandson of Late Mrs. Geetha & Late Vittal Nagappa Kamath, Shirali",
      "Grandson of Late Mrs. Anuradha & Late K. Goverdhan Appa Kamath, Mulki",
    ],
  },

  connector: "With",

  bride: {
    label: "Chi. Sou.",
    name: "PAVITRA",
    lines: [
      "D/o Smt. Pooja & Shri. Pramod Govind Bhandarkar, Kumta",
    ],
  },

  // Wedding date/time — used for the countdown AND the calendar links.
  // Use ISO 8601 with timezone offset. This example is IST (+05:30).
  eventStartISO: "2026-11-26T12:18:00+05:30",
  eventEndISO: "2026-11-26T14:18:00+05:30",
  dateDisplay: "Thursday, 26th November, 2026",
  muhurtham: "Muhurtham: 12:18 p.m. (Abhijith Lagnam)",

  venue: {
    name: "Shree Kavoor Kamakshi Sabhagraha,",
    address: "Moorukatte, Kumta",
    // Full Google Maps link (short links like maps.app.goo.gl/... work fine)
    mapsUrl: "https://maps.app.goo.gl/o9BMJJpuHta8LzcY7",
    // QR image should point to the same mapsUrl — see scripts/generate_assets.py
    qrImage: "assets/venue-qr.png",
  },

  compliments: {
    heading: "With Best Compliments From,",
    lines: [
      "Kamath Family, Shirali",
      "Kamath Family, Mulki",
      "Bhandarkar Family, Kumta",
      "Relatives & Friends",
    ],
  },

  footerNote: "“Presents in Blessings Only”",

  // Set to null to hide the photo-sharing section entirely.
  photoShare: {
    heading: "Share Your Photos & Videos",
    body: "Help us collect memories from the day — drop your photos here.",
    url: "", // TODO: paste your shared Google Photos / Drive album link here
    buttonLabel: "Add Photos",
  },

  // Calendar event details (separate from display strings above,
  // since calendar apps want plain text, not decorative formatting)
  calendar: {
    title: "Kiran & Pavitra's Wedding",
    description: "Wedding of Kiran (S/o Jyothi & Uday Kamath) and Pavitra (D/o Pooja & Pramod Bhandarkar). Muhurtham at 12:18 p.m.",
    location: "Shree Kavoor Kamakshi Sabhagraha, Moorukatte, Kumta",
  },
};
