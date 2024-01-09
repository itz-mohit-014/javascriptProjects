const inputText = document.querySelector("textarea");
const choiceContainer = document.querySelector("#add-choice");

function addChoice(e) {
  const text = e.target.value;
  createEl(text);

  if (e.key === "Enter") {
    setTimeout(() => {
      e.target.value = "";
    }, 10);
    randomchoice();
  }
}

const createEl = (choice) => {
  let words = choice
    .split(",")
    .filter((word) => word.trim() !== "")
    .map((word) => word.trim());
  choiceContainer.innerHTML = "";

  words.forEach((word) => {
    const span = document.createElement("span");
    span.classList.add("choice");
    span.textContent = word;
    choiceContainer.appendChild(span);
  });
};

function randomchoice() {
  let allChoices = choiceContainer.children.length;

  let interval = setInterval(() => {
    let random = Math.floor(Math.random() * allChoices);
    let tag = choiceContainer.children[random];
    highlightChoice(tag);
    setTimeout(() => {
      unhighlight(tag);
    }, 200);
  }, 200);

  setTimeout(() => {
    clearInterval(interval);

    let random = Math.floor(Math.random() * allChoices);
    let tag = choiceContainer.children[random];
    highlightChoice(tag);
  }, 8000);
}

function highlightChoice(tag) {
  tag.classList.add("highlight");
}

function unhighlight(tag) {
  tag.classList.remove("highlight");
}

inputText.addEventListener("keydown", addChoice, false);
