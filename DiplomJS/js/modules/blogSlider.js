const CLONE_SETS = 2;
const AUTOPLAY_MS = 4500;

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

export function initBlogSlider() {
  const root = document.querySelector("[data-blog-slider]");
  const track = root?.querySelector(".blog__track");
  if (!root || !track) return;

  const originals = [...track.children];
  const count = originals.length;
  if (count < 2) return;

  const makeClones = () =>
    originals.map((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.inert = true;
      clone
        .querySelectorAll("img")
        .forEach((img) => img.setAttribute("loading", "eager"));
      return clone;
    });

  for (let i = 0; i < CLONE_SETS; i++) {
    track.prepend(...makeClones());
    track.append(...makeClones());
  }

  const cards = [...track.children];
  const start = CLONE_SETS * count;
  let index = start;
  let step = 0;
  let animating = false;
  let endTimer = 0;

  const measure = () => {
    step = cards[1].offsetLeft - cards[0].offsetLeft;
  };

  const render = (animate, dragOffset = 0) => {
    track.style.transition = animate ? "" : "none";
    track.style.transform = `translate3d(${-index * step + dragOffset}px, 0, 0)`;
    if (!animate) void track.offsetWidth;
  };

  const normalize = () => {
    let next = index;
    if (index >= start + count) next -= count;
    else if (index < start) next += count;
    if (next !== index) {
      index = next;
      render(false);
    }
  };

  const finish = () => {
    clearTimeout(endTimer);
    if (!animating) return;
    animating = false;
    normalize();
  };

  const moveTo = (nextIndex) => {
    if (animating) return;
    animating = true;
    index = nextIndex;
    render(true);
    endTimer = setTimeout(finish, 800);
  };

  const next = () => moveTo(index + 1);
  const prev = () => moveTo(index - 1);

  track.addEventListener("transitionend", (event) => {
    if (event.target === track && event.propertyName === "transform") finish();
  });

  document.querySelector(".blog__arrow--next")?.addEventListener("click", next);
  document.querySelector(".blog__arrow--prev")?.addEventListener("click", prev);

  let dragging = false;
  let startX = 0;
  let dx = 0;

  track.addEventListener("dragstart", (event) => event.preventDefault());

  track.addEventListener("pointerdown", (event) => {
    if (animating || (event.pointerType === "mouse" && event.button !== 0))
      return;
    dragging = true;
    startX = event.clientX;
    dx = 0;
    track.classList.add("is-dragging");
    track.setPointerCapture(event.pointerId);
  });

  track.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    dx = event.clientX - startX;
    render(false, dx);
  });

  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("is-dragging");
    const threshold = Math.min(80, step * 0.2);
    if (dx < -threshold) moveTo(index + 1);
    else if (dx > threshold) moveTo(index - 1);
    else if (dx !== 0) {
      animating = true;
      render(true); // вернуть на место
      endTimer = setTimeout(finish, 800);
    }
  };
  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);

  let timer = 0;
  let hovered = false;
  let visible = false;

  const updateAutoplay = () => {
    clearInterval(timer);
    if (!AUTOPLAY_MS || reduceMotion) return;
    if (visible && !hovered && !document.hidden)
      timer = setInterval(next, AUTOPLAY_MS);
  };

  const area = root.closest(".blog__inner") ?? root;
  area.addEventListener(
    "mouseenter",
    () => ((hovered = true), updateAutoplay()),
  );
  area.addEventListener(
    "mouseleave",
    () => ((hovered = false), updateAutoplay()),
  );
  area.addEventListener("focusin", () => ((hovered = true), updateAutoplay()));
  area.addEventListener(
    "focusout",
    () => ((hovered = false), updateAutoplay()),
  );
  document.addEventListener("visibilitychange", updateAutoplay);

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    updateAutoplay();
  }).observe(root);

  new ResizeObserver(() => {
    measure();
    render(false);
  }).observe(root);

  measure();
  render(false);
}
