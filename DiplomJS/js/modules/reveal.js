
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
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach(({ target }) => {
          observer.unobserve(target);
          target.classList.add("is-revealed");

          
          setTimeout(() => {
            target.classList.remove("reveal", "is-revealed", `reveal--${target.dataset.reveal}`);
            target.style.removeProperty("--reveal-delay");
            delete target.dataset.reveal;
          }, CLEANUP_MS);
        });
    },
    { rootMargin: "0px 0px -10% 0px" },
  );

  GROUPS.forEach(({ selector, effect = "up", stagger = 0 }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.dataset.reveal = effect;
      el.classList.add("reveal", `reveal--${effect}`);
      el.style.setProperty("--reveal-delay", `${Math.min(i * stagger, MAX_DELAY_MS)}ms`);
      observer.observe(el);
    });
  });
}
