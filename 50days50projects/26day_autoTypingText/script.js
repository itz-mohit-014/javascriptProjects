const dynamicTextEl = document.getElementById("dynamic-text");
const inputSpeed = document.querySelector("input");
const text = "Welcome to the Programming World!";
let startChar = 0;
let initialSpeed = 350 / inputSpeed.value;
let intervalId;

function dynmicText(str) {
  const letters = str.split("");
  addingText(letters);
}

function addingText(arrayOfLetters) {
  intervalId = setInterval(() => {
    dynamicTextEl.textContent += arrayOfLetters[startChar];
    startChar++;
    if (startChar == arrayOfLetters.length + 1) {
      startChar = 0;
      dynamicTextEl.textContent = "";
    }
  }, initialSpeed);
}

inputSpeed.addEventListener("input", (e) => {
  initialSpeed = 350 / e.target.value;
  clearInterval(intervalId);
  dynmicText(text);
});

dynmicText(text);
