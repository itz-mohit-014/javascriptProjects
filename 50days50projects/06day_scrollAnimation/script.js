const cards = document.querySelectorAll(".cards");

function revealCards(e) {
  const winHeight = window.innerHeight - 160;
  // 160 is card height show it should be visible from the bottom.
  console.log(winHeight);
  cards.forEach((card) => {
    const boxTop = card.getBoundingClientRect().top;
    console.log(boxTop);
    if (boxTop < winHeight) {
      card.classList.add("show");
      card.style.backgroundColor = "blue";
    } else {
      card.classList.remove("show");
    }
  });
  // console.log(e.srcElement);
}

revealCards();
window.addEventListener("scroll", revealCards, false);
