
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initProductSlider() {
  const root = document.querySelector(".product__viewport");
  if (!root) return;

  const stats = document.querySelectorAll("[data-stat]");

  const swiper = new Swiper(root, {
    direction: "vertical",
    speed: reduceMotion ? 0 : 800,
    pagination: {
      el: ".product__slider-btn",
      clickable: true,
      
      modifierClass: "product__pagination-",
      bulletClass: "product__btn",
      bulletActiveClass: "product__btn--active",
      renderBullet: (index, className) =>
        `<button class="${className}" data-index="${index + 1}"></button>`,
    },
    a11y: {
      slideLabelMessage: "Слайд {{index}} из {{slidesLength}}",
      paginationBulletMessage: "Перейти к слайду {{index}}",
    },
  });

  
  const updateStats = () => {
    const { dataset } = swiper.slides[swiper.activeIndex];

    stats.forEach((el) => {
      el.textContent = dataset[el.dataset.stat];
      if (reduceMotion) return;
      el.animate(
        [
          { opacity: 0, transform: "translateY(60%)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 500, easing: "ease-out" },
      );
    });
  };

  swiper.on("slideChange", updateStats);
}
