
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initBlogSlider() {
  const root = document.querySelector("[data-blog-slider]");
  if (!root) return;

  new Glide(root, {
    type: "carousel", 
    perView: 3,
    gap: 35,
    autoplay: reduceMotion ? false : 4500,
    hoverpause: true,
    animationDuration: 600,
    
    breakpoints: {
      1700: { perView: 2.5, gap: 35 },
      1024: { perView: 2.2, gap: 28 },
      600: { perView: 1.2, gap: 17 },
    },
  }).mount();
}
