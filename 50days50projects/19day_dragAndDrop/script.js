const boxes = document.getElementsByClassName("boxes");
const dragImg = document.getElementsByClassName("img-drag");

for (let i = 0; i < dragImg.length; i++) {
  dragImg[i].addEventListener("dragstart", dragStarting);
  dragImg[i].addEventListener("dragend", dragEnd);
}

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("dragover", dragOver);
  boxes[i].addEventListener("dragenter", dragEnter);
  boxes[i].addEventListener("dragleave", dragLeave);
  boxes[i].addEventListener("drop", dropingEl);
}

function dragStarting(e) {
  e.target.classList.add("dragging");
  e.target.style.border = "3px solid #d4d4d4";
}

function dragEnd(e) {
  e.target.classList.remove("dragging");
  e.target.style.border = "none";
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  e.currentTarget.style.transform = "scale(1.095)";
}

function dragLeave(e) {
  e.currentTarget.style.transform = "scale(1)";
}

function dropingEl(e) {
  e.preventDefault();
  e.currentTarget.style.transform = "scale(1)";

  // Select the dragged image from the collection
  const draggedImage = document.querySelector(".img-drag.dragging");

  // Append the dragged image to the drop target
  this.innerHTML = "";
  this.appendChild(draggedImage);
}
