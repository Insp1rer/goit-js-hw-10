//--------------------------------IMPORTS---------------------------------//

import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

//--------------------------------SELECTORS---------------------------------//

const button = document.querySelector('[data-start]');
const timerValues = document.querySelectorAll('.value');
const inputField = document.querySelector('#datetime-picker');

//--------------------------------VARIABLES END ETC---------------------------------//

button.disabled = true;
let userSelectedDate;
let interval;
let intervalId;

//--------------------------------PARAMS OBJECT---------------------------------//

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    interval = userSelectedDate - new Date();

    if (interval < 0) {
      button.disabled = true;
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: 'Оберіть дату в майбутньому',
      });
    } else {
      button.disabled = false;
      button.addEventListener('click', handleTimer);
    }
  },
};

//--------------------------------TIMER---------------------------------//

function handleTimer() {
  button.disabled = true;

  intervalId = setInterval(() => {
    const timeDifference = userSelectedDate - new Date();

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      button.disabled = false;
      inputField.disabled = false;
      iziToast.success({
        position: 'topRight',
        message: 'Час вичерпано',
      });
      return;
    } else {
      inputField.disabled = true;
      const timer = convertMs(timeDifference);
      timerValues[0].textContent = timer.days.toString().padStart(2, '0');
      timerValues[1].textContent = timer.hours.toString().padStart(2, '0');
      timerValues[2].textContent = timer.minutes.toString().padStart(2, '0');
      timerValues[3].textContent = timer.seconds.toString().padStart(2, '0');
    }
  }, 1000);
}

//--------------------------------FLATPICKR "CALENDAR"---------------------------------//

const timePicker = flatpickr('#datetime-picker', options);

//--------------------------------CONVERTER---------------------------------//

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//------------------------------------------------------------------------//
