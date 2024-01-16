const inputElements = document.querySelectorAll("input");
inputElements.forEach((input) => {
  input.addEventListener("keydown", isValid);

  input.addEventListener("input", oneLengthChar);
});

function isValid(e) {
  if (e.key >= 0 && e.key <= 9) {
    if (!this.nextElementSibling) return;

    setTimeout(() => {
      this.nextElementSibling.focus();
    }, 10);
  } else if (e.key == "Backspace" && this.value == "") {
    if (!this.previousElementSibling) return;
    setTimeout(() => {
      this.previousElementSibling.value = this.previousElementSibling.value;
      this.previousElementSibling.focus();
    }, 10);
  }
}

function oneLengthChar() {
  this.value.length > 1 ? (this.value = this.value.slice(-1)) : null;
}

window.onloadeddata = inputElements[0].focus();
