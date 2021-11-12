const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;
stopBtnEl.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
startBtnEl.addEventListener('click', changeColorFunc);

function changeColorFunc(event) {
  stopBtnEl.disabled = false;
  startBtnEl.disabled = true;
  function color() {
    bodyEl.style.backgroundColor = `${getRandomHexColor()}`;
  }
  timerId = setInterval(color, 1000);
}
stopBtnEl.addEventListener('click', stopchangeColorFunc);

function stopchangeColorFunc(event) {
  clearInterval(timerId);
  startBtnEl.disabled = false;
  stopBtnEl.disabled = true;
}
