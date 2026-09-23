(() => {
  const email = "camilorainzer26@gmail.com";
  const linkedin = "https://www.linkedin.com/in/camilo-daza-a14123390/";
  const github = "https://github.com/camilorainzar26-star";
  const phone = "+573025344591";

  const icons = {
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 9.5H3.7V20h2.8V9.5ZM5.1 4A1.65 1.65 0 1 0 5.1 7.3 1.65 1.65 0 0 0 5.1 4ZM20.3 20h-2.8v-5.1c0-1.4-.5-2.3-1.7-2.3-1 0-1.5.7-1.8 1.3-.1.2-.1.6-.1.9V20h-2.8s.0-9.3 0-10.5h2.8v1.5c.4-.6 1.3-1.7 3.2-1.7 2.3 0 4 1.5 4 4.8V20Z"/></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7 3.6 3.6 0 0 1 .1-2.6s.8-.3 2.8 1a9.7 9.7 0 0 1 5 0c2-1.3 2.8-1 2.8-1a3.6 3.6 0 0 1 .1 2.6 3.9 3.9 0 0 1 1 2.7c0 3.9-2.3 4.7-4.6 5 .4.3.7 1 .7 2v2.3c0 .3.2.6.7.5A10 10 0 0 0 12 2Z"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M7 3h3l1.5 4-2 1.5a12 12 0 0 0 6 6L17 13l4 1.5V18a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>`,
  };

  const page = document.body.dataset.page || "home";

  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `
      <a class="logo" href="index.html">Camilo Daza Rainzar</a>
      <nav class="nav" aria-label="Primary">
        <a href="work.html" class="${page === "work" ? "is-active" : ""}">Work</a>
        <a href="experience.html" class="${page === "experience" ? "is-active" : ""}">Experience</a>
        <a href="about.html" class="${page === "about" ? "is-active" : ""}">About</a>
        <a href="contact.html" class="${page === "contact" ? "is-active" : ""}">Contact</a>
      </nav>
      <div class="header-icons">
        <a class="icon-btn" href="mailto:${email}" aria-label="Send email">${icons.mail}</a>
        <a class="icon-btn" href="${linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">${icons.linkedin}</a>
      </div>
      <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
    `;
  }

  const mobileHost = document.getElementById("mobile-nav");
  if (mobileHost) {
    mobileHost.className = "mobile-nav";
    mobileHost.hidden = true;
    mobileHost.innerHTML = `
      <a href="work.html">Work</a>
      <a href="experience.html">Experience</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    `;
  }

  const toggle = document.querySelector(".menu-toggle");
  if (toggle && mobileHost) {
    toggle.addEventListener("click", () => {
      const open = mobileHost.hidden;
      mobileHost.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = `
      <p>© <span id="year"></span> Camilo Daza Rainzar</p>
      <a href="work.html">Selected work</a>
    `;
  }

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const contactIcons = document.getElementById("contact-icons");
  if (contactIcons) {
    contactIcons.innerHTML = `
      <a class="icon-btn" href="mailto:${email}" aria-label="Send email">${icons.mail}</a>
      <a class="icon-btn" href="tel:${phone}" aria-label="Call">${icons.phone}</a>
      <a class="icon-btn" href="${linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">${icons.linkedin}</a>
      <a class="icon-btn" href="${github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">${icons.github}</a>
    `;
  }

  const slides = [...document.querySelectorAll(".slide")];
  if (!slides.length) return;

  const pager = document.getElementById("pager");
  const prev = document.getElementById("prev-slide");
  const next = document.getElementById("next-slide");
  const params = new URLSearchParams(window.location.search);
  let index = Number(params.get("i") || 0);
  if (Number.isNaN(index) || index < 0 || index >= slides.length) index = 0;

  const go = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
    if (pager) {
      [...pager.children].forEach((btn, i) => btn.classList.toggle("is-active", i === index));
    }
  };

  if (pager) {
    slides.forEach((_, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = String(i + 1).padStart(2, "0");
      btn.setAttribute("aria-label", `Go to project ${i + 1}`);
      btn.addEventListener("click", () => go(i));
      pager.append(btn);
    });
  }

  prev?.addEventListener("click", () => go(index - 1));
  next?.addEventListener("click", () => go(index + 1));
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") go(index - 1);
    if (event.key === "ArrowRight") go(index + 1);
  });

  let startX = 0;
  const track = document.querySelector(".slider");
  track?.addEventListener("touchstart", (event) => {
    startX = event.changedTouches[0].clientX;
  }, { passive: true });
  track?.addEventListener("touchend", (event) => {
    const dx = event.changedTouches[0].clientX - startX;
    if (Math.abs(dx) < 40) return;
    go(dx < 0 ? index + 1 : index - 1);
  });

  go(index);
})();
