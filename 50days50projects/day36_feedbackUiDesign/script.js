const submitBtn = document.getElementById("submit-review");
const reviewListContainer = document.querySelector(".card-select-option");
let showUserFeedback = document.getElementById("show-result");

reviewListContainer.addEventListener("click", (e) => {
  if (e.currentTarget == e.target) return;
  const allReviews = Array.from(e.currentTarget.children);
  allReviews.forEach((review) => {
    review.classList.remove("active");
  });
  const selectReview = e.target.closest(".options");
  selectReview.classList.add("active");
});

submitBtn.addEventListener("click", () => {
  const feedbackCard = reviewListContainer.parentElement;
  const resultCard = feedbackCard.nextElementSibling;

  for (let i = 0; i < reviewListContainer.children.length; i++) {
    if (reviewListContainer.children[i].classList.contains("active")) {
      showUserFeedback.innerHTML = `Feedback: ${reviewListContainer.children[i].innerText}`;
    }
  }

  if (feedbackCard.classList.contains("hide")) {
    feedbackCard.classList.remove("hide");
    resultCard.classList.add("hide");
  } else {
    feedbackCard.classList.add("hide");
    feedbackCard.nextElementSibling.classList.remove("hide");
  }
});
