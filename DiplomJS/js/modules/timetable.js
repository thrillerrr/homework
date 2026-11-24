export function initTimetable() {
  const buttons = document.querySelectorAll('.timetable__btn');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('timetable__btn--active'));
      btn.classList.add('timetable__btn--active');
    });
  });
}
