const countdown = document.querySelector(".countdown");
let countdownStart = 3;
let intervalId = setInterval(() => {
  countdown.textContent = countdownStart;
  countdownStart--;
  if (countdownStart < 0) {
    countdownStart = 3;
  }
}, 1000);
