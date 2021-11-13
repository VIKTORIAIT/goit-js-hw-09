import Notiflix from 'notiflix';
const form = document.querySelector('form');
const btnSubmit = document.querySelector('button');
form.addEventListener('submit', submitFunc);

function submitFunc(event) {
  const delayInput = event.target.delay.value;
  const stepInput = event.target.step.value;
  const amountInput = event.target.amount.value;
  event.preventDefault();
  for (let i = 1; i <= amountInput; i += 1) {
    let delay = +delayInput + stepInput * (i - 1);
    console.log(delayInput, stepInput);
    createPromise(i, delay)
      .then(data => {
        Notiflix.Notify.success(`✅ ${data}`);
      })

      .catch(data => {
        Notiflix.Notify.failure(`❌ ${data}`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
