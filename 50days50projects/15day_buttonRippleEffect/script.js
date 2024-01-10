const button = document.querySelector("#button");

button.addEventListener("click", (e) => {
  let posY = e.clientY - e.target.offsetTop;
  let posX = e.clientX - e.target.offsetLeft;

  console.log(posX, posY);
  const overlay = document.createElement("span");
  overlay.classList.add("overlay");
  overlay.style.left = `${posX}px`;
  overlay.style.top = `${posY}px`;
  button.appendChild(overlay);

  console.log(posX, posY);

  setTimeout(() => {
    overlay.remove();
  }, 500);
});
