const showPercentage = document.querySelector(".loading-percent");

function showImage() {
  let blurDec = 50;
  let start = 0;
  let opacity = 100;
  let ref = setInterval(() => {
    document.documentElement.style.setProperty("--blur", `${blurDec}px`);
    showPercentage.innerText = `${start}%`;
    showPercentage.style.opacity = `${opacity}%`;
    blurDec -= 1.5;
    start += 3;
    opacity -= 3;
    if (start >= 100) {
      start = 100;
    }
  }, 100);

  setTimeout(() => {
    clearInterval(ref);
  }, 3500);
}

window.onload = showImage;
