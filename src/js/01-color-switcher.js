function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const body = document.querySelector('body');
const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
let timerId = null;

stopBtnEl.setAttribute('disabled', '');

startBtnEl.addEventListener('click', event => {
  body.style.backgroundColor = getRandomHexColor();
  event.target.setAttribute('disabled', '');
  stopBtnEl.removeAttribute('disabled');

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1200);
});

stopBtnEl.addEventListener('click', event => {
  clearInterval(timerId);
  event.target.setAttribute('disabled', '');
  startBtnEl.removeAttribute('disabled');
});
