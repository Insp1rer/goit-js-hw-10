import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', promiseCreator);

function promiseCreator(event) {
  event.preventDefault();

  const promiseDelay = event.currentTarget.elements.delay.value;
  const promiseState = event.currentTarget.elements.state.value;

  const createPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseState === 'fulfilled') {
        resolve(promiseDelay);
      } else if (promiseState === 'rejected') {
        reject(promiseDelay);
      }
    }, promiseDelay);
  });

  createPromise
    .then(() => {
      iziToast.success({
        position: 'topRight',
        title: 'OK',
        message: `✅ Fulfilled promise in ${promiseDelay}ms`,
      });
    })
    .catch(() => {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: `❌ Rejected promise in ${promiseDelay}ms`,
      });
    });
}
