const faqContainer = document.querySelector("#faqs-container");

function answer(e) {
  if (e.currentTarget == e.target) {
    return;
  } else if (e.target.closest("div.faq-wrapper").classList.contains("open")) {
    e.target.closest("div.faq-wrapper").classList.toggle("open");
    return;
  } else {
    const allFaq = Array.from(faqContainer.children);

    allFaq.forEach((faqs) => {
      faqs.classList.contains("open") ? faqs.classList.remove("open") : null;
    });
    e.target.closest("div.faq-wrapper").classList.toggle("open");
  }
}

faqContainer.addEventListener("click", answer, false);
