const allInsectList = document.querySelectorAll(".insects a");
const playgroundSection = document.querySelector(".playground-section");
const mainPlayground = playgroundSection.children[1];
const playGameBtn = document.getElementById("play-game");
const attentionMessage = document.querySelector(".overlay-action");

let eventsEnable = true;
let invervalId = null;
let currentScore = 0;
let insectURL = null;

attentionMessage.classList.remove("show");
playGameBtn.addEventListener("click", () => {
  if (mainPlayground.children.length > 0)
    mainPlayground.removeChild(mainPlayground.children[0]);
});

function startGame(e) {
  insectURL = e.currentTarget.children[1].src;
  addInsectToScreen();
  startTime();
}

function addInsectToScreen() {
  const rect = playgroundSection.children[1].getBoundingClientRect();
  const height = rect.height - 100;
  const width = rect.width - 100;
  const randomPosX = Math.floor(Math.random() * width);
  const randomPosY = Math.floor(Math.random() * height);
  const insectImg = createInsect(insectURL);
  insectImg.style.top = `${randomPosY}px`;
  insectImg.style.left = `${randomPosX}px`;
  mainPlayground.appendChild(insectImg);
}

function createInsect(src) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = "insect";
  img.className = "transition";
  img.addEventListener("click", imageEvent);
  setTimeout(() => {
    img.classList.add("show");
  }, 50);
  return img;
}

function imageEvent(e) {
  if (!eventsEnable) return;
  e.currentTarget.classList.remove("show");
  countScore();
  setTimeout(() => {
    this.remove();
  }, 50);

  setTimeout(() => {
    addInsectToScreen();
  }, 300);
  setTimeout(() => {
    addInsectToScreen();
  }, 480);
}

function countScore() {
  currentScore++;
  let scoreEl = playgroundSection.children[0].children[1].children[0];
  scoreEl.innerHTML = currentScore;
  if (currentScore > 20) {
    stopGame();
  }
}

function startTime() {
  let timeEl = playgroundSection.children[0].children[0].children[0];
  let second = 1;
  let minitus = 0;
  function setTime() {
    if (!eventsEnable) {
      clearInterval(invervalId);
    }

    second = 60 / second;
    minitus = second % 60;
    // second++;
    // if (second > 60) {
    //   second = 0;
    //   min++;
    // }
    // if (second < 10 && min < 10) {
    //   timeEl.innerHTML = `0${min}:0${second}`;
    // } else if (min < 10) {
    //   timeEl.innerHTML = `0${min}:${second}`;
    // } else if (second < 10) {
    //   timeEl.innerHTML = `${min}:0${second}`;
    // }
  }

  invervalId = setInterval(setTime, 1000);
}

function stopGame() {
  attentionMessage.classList.add("show");
  let allInsects = Array.from(mainPlayground.children);
  eventsEnable = false;
  allInsects.forEach((insects) => {
    insects.removeEventListener("click", imageEvent);
  });
}

allInsectList.forEach((insect) => {
  insect.addEventListener("click", startGame);
});
window.scrollTo(0, 10);
