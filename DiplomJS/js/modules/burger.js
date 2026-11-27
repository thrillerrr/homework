import { stopScroll, startScroll } from "./smoothScroll.js";

export function initBurger() {
  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".header__menu");
  if (!burger || !menu) return;

  const isOpen = () => burger.classList.contains("header__burger--active");

  const setOpen = (open) => {
    burger.classList.toggle("header__burger--active", open);
    menu.classList.toggle("header__menu--active", open);
    document.body.classList.toggle("body--lock", open);
    burger.setAttribute("aria-expanded", open);
    open ? stopScroll() : startScroll();
  };

  burger.addEventListener("click", () => setOpen(!isOpen()));

  
  document.addEventListener("click", (event) => {
    if (!isOpen()) return;
    const isLink = event.target.closest(".header__link");
    const isInside = event.target.closest(".header__burger, .header__menu");
    if (isLink || !isInside) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) setOpen(false);
  });

  
  window.matchMedia("(width > 768px)").addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}
