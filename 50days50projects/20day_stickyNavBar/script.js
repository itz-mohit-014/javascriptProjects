const nav = document.getElementById("navigation");

function fixedNav() {
  if (window.scrollY > nav.clientHeight + 100) {
    nav.classList.add("fixed");
  } else {
    nav.classList.remove("fixed");
  }

  console.log(window.scrollY);
}

window.addEventListener("scroll", fixedNav);
