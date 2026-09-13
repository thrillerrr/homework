const aboutTabs = document.querySelectorAll('.about__tabs-item');

aboutTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    aboutTabs.forEach((item) => item.classList.remove('about__tabs-item--active'));
    tab.classList.add('about__tabs-item--active');
  });
});
