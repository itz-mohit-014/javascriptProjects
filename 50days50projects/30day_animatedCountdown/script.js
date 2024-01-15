const countdown = document.querySelector(".countdown");
const finalEl = document.querySelector(".final");
const replayBtn = document.getElementById("replay");

function toggle() {
  countdown.parentElement.classList.toggle("hide");
  finalEl.classList.toggle("hide");
}

let countdownStart = 3;
let timeoutId;
let intervalId;
function updateCountdown() {
  countdown.textContent = countdownStart;
  countdownStart--;
  if (countdownStart < 0) {
    countdownStart = 3;
  }
}

function controlTimingFunc() {
  timeoutId = setTimeout(() => {
    clearInterval(intervalId);
    toggle();
  }, 4850);

  intervalId = setInterval(updateCountdown, 1200);
}

updateCountdown();
controlTimingFunc();

replayBtn.addEventListener("click", () => {
  toggle();
  controlTimingFunc();
});
