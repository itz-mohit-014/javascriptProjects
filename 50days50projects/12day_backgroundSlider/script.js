const imageSlider = Array.from(document.getElementsByClassName("slider"));
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const styleSheet = document.getElementById("crousel-stylesheet").sheet;
const imgSliderParent = document.querySelector(".slider-wrapper");

let activeSlide = 0;

function changeSlide() {
  imageSlider.forEach((slide) => {
    let pos = activeSlide * 100;
    slide.style.translate = `-${pos}%`;
  });

  const dynamicChangeBg = `  .slider-wrapper::after{background:
 no-repeat url("./images/img${activeSlide + 1}.jpeg") center / cover;}`;

  styleSheet.insertRule(dynamicChangeBg, styleSheet.cssRules.length);
}

function prevSlide() {
  activeSlide--;
  if (activeSlide < 0) {
    activeSlide = 0;
  }
  changeSlide();
}

function nextSlide() {
  activeSlide++;
  if (activeSlide > 4) {
    activeSlide = 0;
  }
  changeSlide();
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

setInterval(() => {
  activeSlide++;
  if (activeSlide > 4) {
    activeSlide = 0;
  }
  changeSlide();
}, 2000);
