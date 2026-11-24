const TAB_ACTIVE_CLASS = "about__tabs-item--active";
const OUT_CLASS = "about__item--out";
const IN_CLASS = "about__item--in";

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const OUT_MS = reduceMotion ? 0 : 400; // должно совпадать с transition в about.css
const STAGGER_MS = reduceMotion ? 0 : 90;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function initAboutTabs() {
  const tabs = [...document.querySelectorAll(".about__tabs-item")];
  const content = document.querySelector(".about__content");
  const items = [...document.querySelectorAll(".about__item")];
  if (tabs.length === 0 || !content || items.length === 0) return;

  const itemsFor = (tab) =>
    items.filter((item) => item.dataset.tabs.split(" ").includes(tab));

  let current =
    tabs.find((t) => t.classList.contains(TAB_ACTIVE_CLASS))?.dataset.tab ??
    tabs[0].dataset.tab;
  let run = 0;

  const markTabs = () => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.tab === current;
      tab.classList.toggle(TAB_ACTIVE_CLASS, isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
  };

  const lockHeight = () => {
    content.style.minHeight = "";
    const hidden = items.filter((item) => item.hidden);
    hidden.forEach((item) => (item.hidden = false));
    const height = content.offsetHeight;
    hidden.forEach((item) => (item.hidden = true));
    content.style.minHeight = `${height}px`;
  };

  const showTab = async (tab) => {
    if (tab === current) return;
    current = tab;
    markTabs();
    const myRun = ++run;

    const leaving = items.filter((item) => !item.hidden);
    leaving.forEach((item, i) => {
      item.style.transitionDelay = `${i * 50}ms`;
      item.classList.remove(IN_CLASS);
      item.classList.add(OUT_CLASS);
    });
    await wait(OUT_MS + Math.max(0, leaving.length - 1) * 50);
    if (myRun !== run) return; // пока ждали, нажали другую вкладку

    leaving.forEach((item) => {
      item.hidden = true;
      item.classList.remove(OUT_CLASS);
      item.style.transitionDelay = "";
    });

    const entering = itemsFor(tab);
    entering.forEach((item) => {
      item.hidden = false;
      item.classList.add(IN_CLASS);
    });
    void content.offsetWidth;
    entering.forEach((item, i) => {
      item.style.transitionDelay = `${i * STAGGER_MS}ms`;
      item.classList.remove(IN_CLASS);
    });
    await wait(OUT_MS + entering.length * STAGGER_MS);
    if (myRun === run)
      entering.forEach((item) => (item.style.transitionDelay = ""));
  };

  tabs.forEach((tab) => {
    tab.setAttribute("role", "tab");
    tab.addEventListener("click", () => showTab(tab.dataset.tab));
  });
  tabs[0].parentElement.setAttribute("role", "tablist");

  markTabs();
  lockHeight();
  window.addEventListener("resize", () => {
    clearTimeout(lockHeight.timer);
    lockHeight.timer = setTimeout(lockHeight, 150);
  });
  document.fonts?.ready.then(lockHeight);
}
