const boxWrapper = document.getElementById("box-wrapper");
let row = 4;
let col = 4;

if (window.screen.width < 660) {
  row = 3;
  col = 3;
} else {
  row = 4;
  col = 4;
}

function addInnerBoxes() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const createBox = document.createElement("div");
      createBox.className = "box transition";

      createBox.style = `--background-position:${-j * 150}px ${-i * 140}px;`;
      boxWrapper.append(createBox);
    }
  }
}

addInnerBoxes();

const magicBtn = document
  .getElementById("rotateBoxes")
  .addEventListener("click", () => {
    boxWrapper.classList.toggle("remove-gap");
    for (let i = 0; i < boxWrapper.children.length; i++) {
      boxWrapper.children[i].classList.toggle("closest");
    }
  });
