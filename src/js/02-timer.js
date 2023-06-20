import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerInputEl = document.getElementById('datetime-picker');
const timerStartBtnEl = document.querySelector('[data-start]');
const timerCountdownList = document.querySelectorAll('.value');

let savedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - options.defaultDate <= 0) {
      timerStartBtnEl.setAttribute('disabled', '');
      Notify.failure('Please choose a date in the future');
      return;
    }

    Notify.success('Date has been chosen correctly');
    savedDate = selectedDates[0];
    timerStartBtnEl.removeAttribute('disabled');
  },
};

flatpickr(timerInputEl, options);

timerStartBtnEl.setAttribute('disabled', '');

timerStartBtnEl.addEventListener('click', () => {
  const timerId = setInterval(() => {
    timerStartBtnEl.setAttribute('disabled', '');
    timerInputEl.setAttribute('disabled', '');
    const timeLeftMs = savedDate - options.defaultDate;
    if (timeLeftMs < 1000) {
      clearInterval(timerId);
      Notify.success("Congratulations🎉 Time's end!");
    }
    const timeLeftObj = convertMs(timeLeftMs);
    displayCountdown(timeLeftObj);
    savedDate -= 1000;
  }, 1000);
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function displayCountdown(date) {
  timerCountdownList[0].textContent = addLeadingZero(date.days);
  timerCountdownList[1].textContent = addLeadingZero(date.hours);
  timerCountdownList[2].textContent = addLeadingZero(date.minutes);
  timerCountdownList[3].textContent = addLeadingZero(date.seconds);
}

function addLeadingZero(date) {
  if (date < 10) {
    return `0${date}`;
  }
  return date;
}
