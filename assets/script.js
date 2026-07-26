(function () {
  const $ = (id) => document.getElementById(id);

  function fillLines(container, lines) {
    container.innerHTML = "";
    (lines || []).forEach((line) => {
      const p = document.createElement("p");
      p.textContent = line;
      container.appendChild(p);
    });
  }

  function render() {
    document.title = CONFIG.siteTitle || document.title;

    $("invocation").textContent = CONFIG.invocation || "";
    $("invocation").style.display = CONFIG.invocation ? "" : "none";

    $("hosts").textContent = CONFIG.hosts || "";
    $("hosts-line").textContent = CONFIG.hostsLine || "";

    $("groom-name").textContent = `${CONFIG.groom.label} ${CONFIG.groom.name}`.trim();
    fillLines($("groom-lines"), CONFIG.groom.lines);

    $("connector").textContent = CONFIG.connector || "With";

    $("bride-name").textContent = `${CONFIG.bride.label} ${CONFIG.bride.name}`.trim();
    fillLines($("bride-lines"), CONFIG.bride.lines);

    $("date-display").textContent = CONFIG.dateDisplay || "";
    $("muhurtham").textContent = CONFIG.muhurtham || "";

    $("venue-name").textContent = CONFIG.venue.name || "";
    $("venue-address").textContent = CONFIG.venue.address || "";
    $("venue-maps-link").href = CONFIG.venue.mapsUrl || "#";
    if (CONFIG.venue.qrImage) {
      $("venue-qr").src = CONFIG.venue.qrImage;
    } else {
      $("venue-qr").style.display = "none";
    }

    $("compliments-heading").textContent = CONFIG.compliments.heading || "";
    fillLines($("compliments-lines"), CONFIG.compliments.lines);

    $("footer-note").textContent = CONFIG.footerNote || "";

    // Photo share section (hidden entirely if config.photoShare is null/absent)
    const photoSection = $("photo-share-section");
    if (CONFIG.photoShare && CONFIG.photoShare.url) {
      $("photo-heading").textContent = CONFIG.photoShare.heading || "Share Your Photos";
      $("photo-body").textContent = CONFIG.photoShare.body || "";
      const link = $("photo-link");
      link.textContent = CONFIG.photoShare.buttonLabel || "Add Photos";
      link.href = CONFIG.photoShare.url;
    } else {
      photoSection.classList.add("hidden");
    }
  }

  // ---------- Countdown ----------
  function startCountdown() {
    const target = new Date(CONFIG.eventStartISO).getTime();
    const wrap = $("countdown");
    const overMsg = $("countdown-over");

    function tick() {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        wrap.classList.add("hidden");
        overMsg.classList.remove("hidden");
        clearInterval(timer);
        return;
      }
      const s = Math.floor(diff / 1000);
      const days = Math.floor(s / 86400);
      const hours = Math.floor((s % 86400) / 3600);
      const minutes = Math.floor((s % 3600) / 60);
      const seconds = s % 60;
      $("cd-days").textContent = days;
      $("cd-hours").textContent = String(hours).padStart(2, "0");
      $("cd-minutes").textContent = String(minutes).padStart(2, "0");
      $("cd-seconds").textContent = String(seconds).padStart(2, "0");
    }
    tick();
    const timer = setInterval(tick, 1000);
  }

  // ---------- Calendar links ----------
  function toUtcStamp(iso) {
    const d = new Date(iso);
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  function setupCalendar() {
    const start = toUtcStamp(CONFIG.eventStartISO);
    const end = toUtcStamp(CONFIG.eventEndISO || CONFIG.eventStartISO);
    const cal = CONFIG.calendar || {};
    const title = encodeURIComponent(cal.title || CONFIG.siteTitle || "Wedding");
    const details = encodeURIComponent(cal.description || "");
    const location = encodeURIComponent(cal.location || "");

    const gcalUrl =
      `https://www.google.com/calendar/render?action=TEMPLATE` +
      `&text=${title}&dates=${start}/${end}` +
      `&details=${details}&location=${location}`;
    $("cal-google").href = gcalUrl;

    $("cal-ics").addEventListener("click", () => {
      const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//lagna-patrika//wedding-invite//EN",
        "BEGIN:VEVENT",
        `UID:${Date.now()}@lagna-patrika`,
        `DTSTAMP:${toUtcStamp(new Date().toISOString())}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${cal.title || CONFIG.siteTitle || "Wedding"}`,
        `DESCRIPTION:${(cal.description || "").replace(/\n/g, "\\n")}`,
        `LOCATION:${cal.location || ""}`,
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const blob = new Blob([ics], { type: "text/calendar" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "wedding-invite.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  render();
  startCountdown();
  setupCalendar();
})();
