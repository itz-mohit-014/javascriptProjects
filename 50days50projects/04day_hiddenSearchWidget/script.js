const searchIcon = document.querySelector(".search-icon");

searchIcon.addEventListener("click", showSearch);

function showSearch() {
  const input = document.getElementById("search");
  input.classList.toggle("show");
  input.focus();
}
