const navToggleBtn = document.getElementById("toggle-nav-btn");
const nav = document.getElementById("navigation");

navToggleBtn.addEventListener("click", (e) => {
  nav.classList.toggle("active");
});
