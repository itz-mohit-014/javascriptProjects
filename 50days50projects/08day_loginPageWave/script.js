const labelElements = document.querySelectorAll(".input-details label");
const regesterCardLink = document.querySelector("#regester-here");

function waveText(el, index) {
  const text = el.innerHTML;
  labelElements[index].innerHTML = "";
  text
    .split("")
    .map((letter, count) => {
      const spanTag = document.createElement("span");
      spanTag.classList.add("wave-text");
      spanTag.setAttribute("style", `--transition-delay : ${count * 60}ms`);
      spanTag.innerHTML = letter;
      labelElements[index].append(spanTag);
    })
    .join();
}

labelElements.forEach(waveText);

regesterCardLink.addEventListener("click", openCard);

function openCard() {
  console.log(regesterCardLink);
}
