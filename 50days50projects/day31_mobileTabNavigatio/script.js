const navUl = document.querySelector(".nav-menus");
const displayImgContainer = document.querySelector(".mobile-body");
const activeLiBorder = document.querySelector(".active-border");
function activeMenu(e) {
  if (e.target == this) return;
  else {
    const menuList = Array.from(e.currentTarget.children);
    menuList.forEach((li) => {
      li.classList.remove("active");
    });
    const currentLI = e.target.closest("li.nav-menu-items");
    currentLI.classList.add("active");

    let output = activeBorderPosition();
    console.log(output);

    menuList.forEach((li, index) => {
      li.classList.contains("active") ? changeBgImage(index) : null;
    });
  }
}
navUl.addEventListener("click", activeMenu);

function changeBgImage(currentLiIndex) {
  const allImages = Array.from(displayImgContainer.children);
  allImages.forEach((img, index) => {
    if (currentLiIndex == index) {
      img.classList.add("show");
    } else {
      img.classList.remove("show");
    }
  });
}

function activeBorderPosition() {
  let allLiMenus = Array.from(navUl.children);
  let currentLiParentPosition = navUl.getBoundingClientRect();
  let currentLiPosition;
  allLiMenus.forEach((li) => {
    if (li.classList.contains("active")) {
      currentLiPosition = li.getBoundingClientRect();
    }
  });

  activeLiBorder.style.left = `${
    currentLiPosition.left - currentLiParentPosition.left
  }px`;
  activeLiBorder.style.width = `${currentLiPosition.width}px`;
}
activeBorderPosition();
