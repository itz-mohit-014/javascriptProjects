const left = document.querySelector(".left");
const right = document.querySelector(".right");
const section = document.querySelector(".main");

// left.addEventListener("mousemove", () => {
//   left.classList.add("expanding");
// });
// left.addEventListener("mouseleave", () => {
//   left.classList.remove("expanding");
// });

// right.addEventListener("mousemove", () => {
//   right.classList.add("expanding");
// });
// right.addEventListener("mouseleave", () => {
//   right.classList.remove("expanding");
// });

//  optmizing code

function expandArea(e) {
  const clientPosition = e.clientX;
  const halfOfWindow = window.innerWidth / 2;
  if (clientPosition < halfOfWindow) {
    right.classList.remove("expanding");
    left.classList.add("expanding");
  } else {
    left.classList.remove("expanding");
    right.classList.add("expanding");
  }
}
function normalArea() {
  left.classList.remove("expanding");
  right.classList.remove("expanding");
}

section.addEventListener("mousemove", expandArea);
section.addEventListener("mouseleave", normalArea);
