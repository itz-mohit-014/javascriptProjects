const toggleBtn = document
  .getElementById("toggle-sidebar")
  .addEventListener("click", toggleSideBar);

function toggleSideBar() {
  const whiteNav = this.parentElement;
  whiteNav.classList.toggle("active");
  whiteNav.parentElement.classList.toggle("active");
  whiteNav.parentElement.parentElement.classList.toggle("active");
  this.classList.toggle("active");

  // .classList.toggle("active");
}
