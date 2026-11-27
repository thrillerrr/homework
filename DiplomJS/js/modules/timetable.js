export function initTimetable() {
  const buttons = document.querySelectorAll(".timetable__btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.toggle("timetable__btn--active", b === btn));
    });
  });
}
