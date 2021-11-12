import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    btnStart.disabled = true;
    if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future', function cb() {
        // callback
      });
    } else btnStart.disabled = false;
  },
};

const flatp = flatpickr(inputEl, options);

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

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}

let timerId = null;
btnStart.addEventListener('click', startTimeFunc);

function startTimeFunc(event) {
  if (timerId) return;
  const differ = intervalCallback();
  if (differ < 1000) return;
  timerId = setInterval(intervalCallback, 1000);
}

function intervalCallback() {
  const differ = flatp.selectedDates[0].getTime() - new Date().getTime();

  if (differ < 0) {
    clearInterval(timerId);
    timerId = null;

    return differ;
  }

  let { days, hours, minutes, seconds } = convertMs(differ);

  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);

  return differ;
}
