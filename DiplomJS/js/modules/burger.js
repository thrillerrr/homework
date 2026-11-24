import { stopScroll, startScroll } from "./smoothScroll.js";

export function initBurger() {
  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".header__menu");

  if (!burger || !menu) return;

  const BURGER_ACTIVE_CLASS = "header__burger--active";
  const MENU_ACTIVE_CLASS = "header__menu--active";
  const LOCK_CLASS = "body--lock";

  const isOpen = () => burger.classList.contains(BURGER_ACTIVE_CLASS);

  const openMenu = () => {
    burger.classList.add(BURGER_ACTIVE_CLASS);
    menu.classList.add(MENU_ACTIVE_CLASS);
    document.body.classList.add(LOCK_CLASS);
    burger.setAttribute("aria-expanded", "true");
    stopScroll();
  };

  const closeMenu = () => {
    burger.classList.remove(BURGER_ACTIVE_CLASS);
    menu.classList.remove(MENU_ACTIVE_CLASS);
    document.body.classList.remove(LOCK_CLASS);
    burger.setAttribute("aria-expanded", "false");
    startScroll();
  };

  burger.addEventListener("click", (event) => {
    event.stopPropagation();
    isOpen() ? closeMenu() : openMenu();
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest(".header__link")) closeMenu();
  });

  document.addEventListener("click", (event) => {
    if (
      isOpen() &&
      !menu.contains(event.target) &&
      !burger.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) closeMenu();
  });

  window.matchMedia("(width > 768px)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
}
