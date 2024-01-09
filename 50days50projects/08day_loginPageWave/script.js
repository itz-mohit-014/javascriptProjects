const labelElements = document.querySelectorAll(".input-details label");

function waveText(word, index) {
  word
    .split("")
    .map((letter, count) => {
      const spanTag = document.createElement("span");
      spanTag.classList.add("wave-text");
      spanTag.setAttribute("style", `--transition-delay : ${count * 60}ms`);
      spanTag.innerText = letter;
      labelElements[index].append(spanTag);
    })
    .join();
}

labelElements.forEach((_, index) => {
  const wordText = ["Email", "Password"];
  waveText(wordText[index], index);
});
