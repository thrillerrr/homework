const GROUPS = [
  { selector: ".product__info", effect: "left" },
  { selector: ".product__prod", effect: "right" },
  { selector: ".collections__card", stagger: 120 },
  { selector: ".programs__row" },
  { selector: ".programs__card", stagger: 120 },
  { selector: ".review__background", effect: "fade" },
  { selector: ".about__tabs", effect: "left" },
  { selector: ".about__content", effect: "right" },
  { selector: ".about__stats-card", stagger: 100 },
  { selector: ".advantage__inner > *", effect: "fade", stagger: 70 },
  { selector: ".timetable__title" },
  { selector: ".timetable__btns" },
  { selector: ".timetable__table" },
  { selector: ".lightbox__video", effect: "zoom" },
  { selector: ".accordion__title" },
  { selector: ".detail", stagger: 100 },
  { selector: ".coaches__row" },
  { selector: ".coaches__card", stagger: 120 },
  { selector: ".blog__title", effect: "left" },
  { selector: ".blog__content" },
  { selector: ".footer__top" },
  { selector: ".footer__main" },
];

const MAX_DELAY_MS = 400;
const CLEANUP_MS = 1400;

export function initReveal() {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets = [];

  GROUPS.forEach(({ selector, effect = "up", stagger = 0 }) => {
    const indexInParent = new Map();

    document.querySelectorAll(selector).forEach((el) => {
      const i = indexInParent.get(el.parentElement) ?? 0;
      indexInParent.set(el.parentElement, i + 1);

      el.classList.add("reveal", `reveal--${effect}`);
      if (stagger)
        el.style.setProperty(
          "--reveal-delay",
          `${Math.min(i * stagger, MAX_DELAY_MS)}ms`,
        );
      targets.push({ el, effect });
    });
  });

  const cleanup = (el, effect) => {
    el.classList.remove("reveal", `reveal--${effect}`, "is-revealed");
    el.style.removeProperty("--reveal-delay");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const { effect } = targets.find((t) => t.el === el);
        observer.unobserve(el);
        el.classList.add("is-revealed");
        setTimeout(() => cleanup(el, effect), CLEANUP_MS);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0 },
  );

  targets.forEach(({ el }) => observer.observe(el));
}
