const allInsectList = document.querySelectorAll(".insects");
const playgroundSection = document.querySelector(".playground-section");
const mainPlayground = playgroundSection.children[1];
const playGameBtn = document.getElementById("play-game");
const attentionMessage = document.querySelector(".overlay-action");

let eventsEnable = true;
let intervalId = null;
let insectURL = {};
let currentScore = 0;

attentionMessage.classList.remove("show");
playGameBtn.addEventListener("click", (e) => {
  if (mainPlayground.children.length > 0) {
    for (let i = 0; i < mainPlayground.children.length; i++) {
      mainPlayground.removeChild(mainPlayground.children[i]);
    }
  }
  scrollToNext(e);
});

function scrollToNext(e) {
  let section = e.currentTarget.closest("section");
  section.classList.add("up");
}

function startGame(e) {
  insectURL.src = e.currentTarget.children[1].src;
  insectURL.alt = e.currentTarget.children[1].alt;
  scrollToNext(e);
  addInsectToScreen();
  startTime();
}

function addInsectToScreen() {
  const rect = playgroundSection.children[1].getBoundingClientRect();
  const height = rect.height - 180;
  const width = rect.width - 180;
  console.log(rect.height, rect.width);
  const randomPosX = Math.floor(Math.random() * width);
  const randomPosY = Math.floor(Math.random() * height);
  const insectImg = createInsect(insectURL);
  insectImg.style.top = `${randomPosY}px`;
  insectImg.style.left = `${randomPosX}px`;
  mainPlayground.appendChild(insectImg);
}

function createInsect(insectURL) {
  const img = document.createElement("img");
  img.src = insectURL.src;
  img.alt = insectURL.alt;
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
  }, 500);
}

function countScore() {
  currentScore++;
  let scoreEl = playgroundSection.children[0].children[1].children[0];
  scoreEl.innerHTML = currentScore;
  if (currentScore > 50) {
    stopGame();
  }
}

function startTime() {
  let timeEl = playgroundSection.children[0].children[0].children[0];
  let second = 0;
  function setTime() {
    if (!eventsEnable) clearInterval(intervalId);
    let s = second % 60;
    let m = Math.trunc(second / 60);
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `${m}:${s}`;
    second++;
  }

  intervalId = setInterval(setTime, 1000);
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
