import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelayInputEl = document.querySelector('[name="delay"]');
const delayStepInputEl = document.querySelector('[name="step"]');
const amountInputEl = document.querySelector('[name="amount"]');
const formEl = document.querySelector('.form');

Notify.init({
  useIcon: false,
});

const handleSubmit = event => {
  event.preventDefault();
  let generalDelay = parseInt(firstDelayInputEl.value);

  for (let i = 1; i <= amountInputEl.value; i += 1) {
    setTimeout(() => {
      createPromise(i, generalDelay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      generalDelay += parseInt(delayStepInputEl.value);
    }, generalDelay);
    generalDelay += parseInt(delayStepInputEl.value);
  }
  generalDelay = parseInt(firstDelayInputEl.value);
};

formEl.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  // const shouldResolve = true;

  if (shouldResolve) {
    // Fulfill
    return Promise.resolve({ position, delay });
  } else {
    // Reject
    return Promise.reject({ position, delay });
  }
}
