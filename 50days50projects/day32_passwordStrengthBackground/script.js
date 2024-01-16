const passwordInputEl = document.getElementById("password");
const backgroundEl = document.getElementById("background");
passwordInputEl.addEventListener("input", () => {
  const passLength = passwordInputEl.value.length;

  backgroundEl.style.filter = `blur(${30 - passLength * 3}px)`;
  if (passLength > 12) {
    backgroundEl.style.filter = `blur(0px)`;
  }
});
