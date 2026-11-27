const OUT_MS = 400;

export function initAboutTabs() {
  const tabs = [...document.querySelectorAll(".about__tabs-item")];
  const items = [...document.querySelectorAll(".about__item")];
  const content = document.querySelector(".about__content");
  if (!tabs.length || !items.length || !content) return;

  let current = document.querySelector(".about__tabs-item--active")?.dataset.tab;
  let timer;

  const belongsTo = (item, tab) => item.dataset.tabs.split(" ").includes(tab);

  
  const lockHeight = () => {
    const hidden = items.filter((item) => item.hidden);
    content.style.minHeight = "";
    hidden.forEach((item) => (item.hidden = false));
    content.style.minHeight = `${content.offsetHeight}px`;
    hidden.forEach((item) => (item.hidden = true));
  };

  const showTab = (tab) => {
    if (tab === current) return;
    current = tab;

    tabs.forEach((btn) => {
      const isActive = btn.dataset.tab === tab;
      btn.classList.toggle("about__tabs-item--active", isActive);
      btn.setAttribute("aria-selected", isActive);
    });

    
    items.filter((item) => !item.hidden).forEach((item) => item.classList.add("about__item--out"));

    
    clearTimeout(timer);
    timer = setTimeout(() => {
      items.forEach((item) => {
        item.hidden = !belongsTo(item, tab);
        item.classList.remove("about__item--out");
        item.classList.add("about__item--in");
      });
      void content.offsetWidth; 
      items.forEach((item) => item.classList.remove("about__item--in"));
    }, OUT_MS);
  };

  tabs.forEach((btn) => {
    btn.setAttribute("role", "tab");
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
  });
  tabs[0].parentElement.setAttribute("role", "tablist");

  lockHeight();
  document.fonts?.ready.then(lockHeight);

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(lockHeight, 150);
  });
}
