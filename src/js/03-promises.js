import Notiflix from 'notiflix';

const form = document.querySelector('form');
const btnSubmit = document.querySelector('button');

// let counter = 0;

form.addEventListener('submit', submitFunc);

function submitFunc(event) {
  const amountInput = event.target.amount.value;
  const delayInput = form.elements.delay.value;
  const stepInput = form.elements.step.value;
  event.preventDefault();
  console.log(amountInput);
  for (let i = 1; i <= amountInput; i += 1) {
    const sumDelStep = +delayInput + +stepInput;
    console.log(sumDelStep);
    // createPromise(i, );
  }
}

function createPromise(position, delay) {
  const newPromise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Rejected promise ${position} in ${+delayInput + +stepInput}ms`);
      } else {
        reject(`Fulfilled promise ${position} in ${+delayInput + +stepInput}ms`);
      }
    }, stepInput);
  });
}
