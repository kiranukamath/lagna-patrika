(function () {
  const $ = (id) => document.getElementById(id);

  function render() {
    document.title = CONFIG.siteTitle || document.title;

    $("name1").textContent = CONFIG.couple.person1.name;
    $("parents1").textContent = CONFIG.couple.person1.parents || "";
    $("name2").textContent = CONFIG.couple.person2.name;
    $("parents2").textContent = CONFIG.couple.person2.parents || "";
    $("tagline").textContent = CONFIG.tagline || "";
    $("intro-line").textContent = CONFIG.introLine || "";
    $("date-display").textContent = CONFIG.dateDisplay || "";

    $("detail-date").textContent = CONFIG.dateDisplay || "";
    $("detail-time").textContent = CONFIG.timeDisplay || "";
    $("detail-venue").textContent = `${CONFIG.venue.name}, ${CONFIG.venue.address}`;

    $("venue-name").textContent = CONFIG.venue.name || "";
    $("venue-address").textContent = CONFIG.venue.address || "";
    $("venue-maps-link").href = CONFIG.venue.mapsUrl || "#";
    if (CONFIG.venue.qrImage) {
      $("venue-qr").src = CONFIG.venue.qrImage;
    } else {
      $("venue-qr").style.display = "none";
    }

    // Photo share section (hidden entirely if config.photoShare is null/absent/no url)
    const photoSection = $("photo-share-section");
    if (CONFIG.photoShare && CONFIG.photoShare.url) {
      $("photo-heading").textContent = CONFIG.photoShare.heading || "Share Your Photos";
      $("photo-body").textContent = CONFIG.photoShare.body || "";
      const link = $("photo-link");
      link.textContent = CONFIG.photoShare.buttonLabel || "Add Photos";
      link.href = CONFIG.photoShare.url;
      $("hashtag").textContent = CONFIG.hashtag || "";
      $("hashtag").style.display = CONFIG.hashtag ? "" : "none";
    } else {
      photoSection.classList.add("hidden");
    }

    $("family-note").textContent = CONFIG.familyNote || "";
    $("family-note").style.display = CONFIG.familyNote ? "" : "none";
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
