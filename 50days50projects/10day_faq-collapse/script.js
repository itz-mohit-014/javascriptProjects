const faqBox = document.querySelectorAll(".faq-wrapper");

function showAnswer(e) {
  faqBox.forEach((faq) => {
    faq.classList.remove("open");
    e.currentTarget.classList.add("open");
  });
}

faqBox.forEach((faq) => {
  faq.addEventListener("click", showAnswer);
});
