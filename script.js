document.documentElement.classList.add("js");

const preloader = document.querySelector("[data-preloader]");
const preloaderCount = document.querySelector("[data-preloader-count]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (preloader) {
  const finishPreloader = () => {
    preloader.classList.add("is-done");
    document.body.classList.remove("is-loading");
  };

  if (prefersReducedMotion) {
    preloader.classList.add("is-mark-visible", "is-word-visible");
    window.setTimeout(() => preloader.classList.add("is-exiting"), 320);
    window.setTimeout(finishPreloader, 520);
  } else {
    const started = performance.now();
    const countDuration = 1950;
    const updateCount = (now) => {
      const progress = Math.min(1, (now - started) / countDuration);
      if (preloaderCount) preloaderCount.textContent = String(Math.round(progress * 100));
      if (progress < 1) requestAnimationFrame(updateCount);
    };

    window.setTimeout(() => preloader.classList.add("is-mark-visible"), 180);
    window.setTimeout(() => preloader.classList.add("is-word-visible"), 780);
    window.setTimeout(() => preloader.classList.add("is-exiting"), 1950);
    window.setTimeout(finishPreloader, 2850);
    requestAnimationFrame(updateCount);
  }
}

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const closeMenu = () => {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Открыть меню");
  mobileMenu.hidden = true;
  document.body.classList.remove("menu-open");
};

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Открыть меню" : "Закрыть меню");
  mobileMenu.hidden = isOpen;
  document.body.classList.toggle("menu-open", !isOpen);
});

mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 28);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
if (reduceMotion.matches || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: "0px 0px -5%" });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const parallaxItems = [...document.querySelectorAll(".parallax")];
let parallaxFrame = 0;
const updateParallax = () => {
  parallaxFrame = 0;
  if (reduceMotion.matches) return;
  const viewport = window.innerHeight;
  parallaxItems.forEach((item) => {
    const rect = item.parentElement.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > viewport) return;
    const progress = (viewport - rect.top) / (viewport + rect.height);
    item.style.setProperty("--parallax-y", `${(progress - .5) * 42}px`);
  });
};
const requestParallax = () => {
  if (!parallaxFrame) parallaxFrame = requestAnimationFrame(updateParallax);
};
updateParallax();
window.addEventListener("scroll", requestParallax, { passive: true });
window.addEventListener("resize", requestParallax);

document.querySelectorAll(".accordion details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".accordion details[open]").forEach((other) => {
      if (other !== detail) other.open = false;
    });
  });
});

const form = document.querySelector("[data-contact-form]");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = form.querySelector(".form-status");
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Заявка с сайта Б5Групп — ${data.get("company") || data.get("name")}`);
  const body = encodeURIComponent([
    `Имя: ${data.get("name")}`,
    `Организация: ${data.get("company") || "—"}`,
    `Контакт: ${data.get("contact")}`,
    "",
    `Задача: ${data.get("message")}`
  ].join("\n"));
  status.textContent = "Открываем письмо в вашей почтовой программе.";
  window.location.href = `mailto:info@b5g.ru?subject=${subject}&body=${body}`;
});
