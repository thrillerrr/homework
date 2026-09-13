document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__menu');

  if (!burger || !menu) return;

  const BURGER_ACTIVE_CLASS = 'header__burger--active';
  const MENU_ACTIVE_CLASS = 'header__menu--active';
  const LOCK_CLASS = 'body--lock';

  const openMenu = () => {
    burger.classList.add(BURGER_ACTIVE_CLASS);
    menu.classList.add(MENU_ACTIVE_CLASS);
    document.body.classList.add(LOCK_CLASS);
    burger.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    burger.classList.remove(BURGER_ACTIVE_CLASS);
    menu.classList.remove(MENU_ACTIVE_CLASS);
    document.body.classList.remove(LOCK_CLASS);
    burger.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    burger.classList.contains(BURGER_ACTIVE_CLASS) ? closeMenu() : openMenu();
  };

  burger.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleMenu();
  });

  // Закрытие по клику на ссылку меню
  menu.addEventListener('click', (event) => {
    if (event.target.closest('.header__link')) {
      closeMenu();
    }
  });

  // Закрытие по клику вне меню и кнопки
  document.addEventListener('click', (event) => {
    if (
      burger.classList.contains(BURGER_ACTIVE_CLASS) &&
      !menu.contains(event.target) &&
      !burger.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Закрытие по Esc
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && burger.classList.contains(BURGER_ACTIVE_CLASS)) {
      closeMenu();
    }
  });

  // Закрытие меню при переходе на десктопную ширину
  const mediaQuery = window.matchMedia('(width > 768px)');
  mediaQuery.addEventListener('change', (event) => {
    if (event.matches) {
      closeMenu();
    }

    
  });
});
