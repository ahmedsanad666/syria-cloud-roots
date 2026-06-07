// === Sham Cloud — global behaviors ===
(function () {
  // Navbar scroll
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  // Mobile menu
  const ham = document.querySelector(".hamburger");
  const mm = document.querySelector(".mobile-menu");
  if (ham && mm) ham.addEventListener("click", () => mm.classList.toggle("open"));

  // Scroll reveal
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

  // Counters
  const counters = document.querySelectorAll("[data-counter]");
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.counter);
      const suffix = el.dataset.suffix || "";
      const prefix = el.dataset.prefix || "";
      const dec = (el.dataset.decimals && parseInt(el.dataset.decimals)) || 0;
      const dur = 1600;
      const start = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = (target * eased).toFixed(dec);
        el.textContent = prefix + val + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      cio.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach((c) => cio.observe(c));

  // Tabs
  document.querySelectorAll("[data-tabs]").forEach((wrap) => {
    const tabs = wrap.querySelectorAll(".tab");
    const panels = wrap.querySelectorAll(".tab-panel");
    tabs.forEach((t) =>
      t.addEventListener("click", () => {
        tabs.forEach((x) => x.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));
        t.classList.add("active");
        const id = t.dataset.tab;
        const p = wrap.querySelector(`.tab-panel[data-panel="${id}"]`);
        if (p) p.classList.add("active");
      })
    );
  });

  // FAQ
  document.querySelectorAll(".faq-item").forEach((it) => {
    const q = it.querySelector(".faq-q");
    q.addEventListener("click", () => it.classList.toggle("open"));
  });

  // Pricing toggle
  const toggle = document.querySelector("[data-pricing-toggle]");
  if (toggle) {
    const monthly = document.querySelector("[data-pl-monthly]");
    const annual = document.querySelector("[data-pl-annual]");
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("annual");
      const isAnnual = toggle.classList.contains("annual");
      if (monthly) monthly.classList.toggle("on", !isAnnual);
      if (annual) annual.classList.toggle("on", isAnnual);
      document.querySelectorAll("[data-monthly]").forEach((el) => {
        el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
      });
    });
  }

  // Services filter
  const filterPills = document.querySelectorAll(".fpill");
  const svcCards = document.querySelectorAll(".svc-card");
  const search = document.querySelector("#svcSearch");
  function applyFilter() {
    const active = document.querySelector(".fpill.active")?.dataset.filter || "all";
    const q = (search?.value || "").toLowerCase().trim();
    svcCards.forEach((c) => {
      const cat = c.dataset.category;
      const text = c.textContent.toLowerCase();
      const ok = (active === "all" || cat === active) && (!q || text.includes(q));
      c.classList.toggle("hide", !ok);
    });
  }
  filterPills.forEach((p) =>
    p.addEventListener("click", () => {
      filterPills.forEach((x) => x.classList.remove("active"));
      p.classList.add("active");
      applyFilter();
    })
  );
  if (search) search.addEventListener("input", applyFilter);

  // Contact form validation
  const form = document.querySelector("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      form.querySelectorAll("[required]").forEach((inp) => {
        const field = inp.closest(".field");
        const bad = !inp.value.trim() || (inp.type === "email" && !/^\S+@\S+\.\S+$/.test(inp.value));
        field?.classList.toggle("invalid", bad);
        if (bad) ok = false;
      });
      if (ok) {
        const btn = form.querySelector("button[type=submit]");
        btn.textContent = "✓ Message Sent";
        btn.style.background = "var(--green)";
        form.reset();
        setTimeout(() => {
          btn.textContent = "Send Message →";
          btn.style.background = "";
        }, 3000);
      }
    });
  }
})();
