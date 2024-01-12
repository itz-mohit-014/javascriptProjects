const button = document.querySelectorAll("button");
const slides = Array.from(document.getElementsByClassName("sides"));
let images = slides[1].children[1].children;
let details = slides[0].children[1].children;

let activeSlide = 0;
let intervalId;
let timeoutId;

function changeSlide(e) {
  let direction;
  let slideHeight = slides[0].clientHeight;

  if (!e) {
    direction = "up";
  } else {
    direction = e.currentTarget.dataset.direction;
    clearInterval(intervalId);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        activeSlide++;
        changeSlide(null);
      }, 2500);
    }, 10000);
  }

  if (direction == "up") {
    activeSlide++;
    if (activeSlide > images.length - 1) {
      activeSlide = 0;
    }
  } else if (direction == "down") {
    activeSlide--;
    if (activeSlide < 0) {
      activeSlide = images.length - 1;
    }
  }

  for (let i = 0; i < images.length; i++) {
    images[i].style.transform = `translateY(-${activeSlide * slideHeight}px)`;
    details[i].style.transform = `translateY(${activeSlide * slideHeight}px)`;
  }
}

intervalId = setInterval(() => {
  activeSlide++;
  changeSlide(null);
}, 2500);

button.forEach((bnt) => {
  bnt.addEventListener("click", changeSlide);
});
window.onload = () => {
  slides.forEach((slide) => {
    slide.classList.remove("loading");
  });
};
