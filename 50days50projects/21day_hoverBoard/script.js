const container = document.getElementById("boxes-wrapper");

const innerBoxes = (container.offsetHeight / 19) * (container.offsetWidth / 19);

for (let i = 0; i < innerBoxes; i++) {
  const childBox = document.createElement("div");
  childBox.classList.add("child");

  childBox.addEventListener("mouseover", changeColor);
  childBox.addEventListener("mouseout", removeColor);

  container.appendChild(childBox);
}

function changeColor(e) {
  let randomColor = "#";
  for (let i = 0; i < 6; i++) {
    let colorStr = "1234567890ABCDEF";
    const randomChar = colorStr[Math.trunc(Math.random() * colorStr.length)];
    randomColor += randomChar;
  }
  e.target.style.background = `${randomColor}`;
  e.target.style.boxShadow = `0px 0px 20px ${randomColor}`;
}

function removeColor(e) {
  e.target.style.background = `#000000`;
  e.target.style.boxShadow = `none`;
}
