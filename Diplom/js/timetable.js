const timetableBtns = document.querySelectorAll('.timetable__btn');

timetableBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    timetableBtns.forEach((b) => b.classList.remove('timetable__btn--active'));
    btn.classList.add('timetable__btn--active');
  });
});