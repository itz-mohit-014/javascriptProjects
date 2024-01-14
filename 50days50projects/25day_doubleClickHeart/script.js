const likeCount = document.getElementById("likeCount");
const picture = document.querySelector(".picture");

let clickCount = 0;
function showLike(e) {
  const likeIcon = document.createElement("i");
  likeIcon.className = "fa-solid fa-heart like-icon";
  picture.append(likeIcon);

  likeIcon.style.left = `${e.offsetX}px`;
  likeIcon.style.top = `${e.offsetY}px`;

  clickCount++;
  likeCount.innerHTML = clickCount;

  this.classList.add("liked");
  setTimeout(() => {
    likeIcon.remove("liked");
  }, 500);
}

picture.addEventListener("dblclick", showLike);
