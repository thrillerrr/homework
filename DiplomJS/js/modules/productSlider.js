const ACTIVE_CLASS = "product__btn--active";

export function initProductSlider() {
  const root = document.querySelector(".product__col");
  if (!root) return;

  const viewport = root.querySelector(".product__viewport");
  const slides = [...root.querySelectorAll(".product__slide")];
  const dots = [...root.querySelectorAll(".product__btn")];
  if (!viewport || slides.length === 0) return;

  let current = 0;

  slides.forEach((slide, i) => slide.style.setProperty("--i", i));

  const goTo = (index) => {
    current = Math.max(0, Math.min(index, slides.length - 1));
    viewport.style.setProperty("--active", current);

    dots.forEach((dot, i) => {
      const isActive = i === current;
      dot.classList.toggle(ACTIVE_CLASS, isActive);
      dot.setAttribute("aria-current", String(isActive));
    });

    slides.forEach((slide, i) =>
      slide.setAttribute("aria-hidden", String(i !== current)),
    );
  };

  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));

  root
    .querySelector(".product__slider-btn")
    ?.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const next = current + (event.key === "ArrowDown" ? 1 : -1);
        goTo(next);
        dots[current]?.focus();
      }
    });

  goTo(0);
}
