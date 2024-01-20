const users = [
  {
    name: "Alice Johnson",
    profession: "Software Engineer",
    profilePic: "https://randomuser.me/api/portraits/men/44.jpg",
    review:
      "I am extremely satisfied with the software development services provided. The team was efficient, responsive, and delivered a high-quality product on time.",
  },
  {
    name: "Bob Smith",
    profession: "Graphic Designer",
    profilePic: "https://randomuser.me/api/portraits/men/68.jpg",
    review:
      "The design team exceeded my expectations! They have a keen eye for aesthetics and creativity. I will definitely work with them again for future projects.",
  },
  {
    name: "Charlie Davis",
    profession: "Marketing Manager",
    profilePic: "https://randomuser.me/api/portraits/men/43.jpg",
    review:
      "The marketing campaign was a huge success, thanks to the dedication and strategic thinking of the team. Our brand visibility has significantly increased.",
  },
  {
    name: "David Miller",
    profession: "Accountant",
    profilePic: "https://randomuser.me/api/portraits/men/47.jpg",
    review:
      "Efficient and accurate financial services. The team handled our accounts with precision, and their attention to detail saved us from potential financial issues.",
  },
  {
    name: "Eva White",
    profession: "Healthcare Professional",
    profilePic: "https://randomuser.me/api/portraits/men/73.jpg",
    review:
      "The healthcare solutions provided were comprehensive and user-friendly. Our patients now have improved access to medical information, making our services more efficient.",
  },
];

const cardEl = document.querySelector(".card");

let currentUser = 0;
function loadUserReviewCard() {
  const lineIndicatorEl = document.createElement("div");
  lineIndicatorEl.classList.add("white");

  const reviewText = document.createElement("p");
  reviewText.classList.add("review-text");
  reviewText.innerText = `${users[currentUser].review}`;

  const profielWrapperEl = document.createElement("div");
  profielWrapperEl.classList.add("user-profile");
  profielWrapperEl.innerHTML = `
         <div class="profile">
            <img src="${users[currentUser].profilePic}" alt="Man" />
          </div>
          <div class="right">
            <strong class="name">${users[currentUser].name}</strong>
            <p class="profession">${users[currentUser].profession}</p>
          </div>
    
    `;

  cardEl.innerHTML = "";
  cardEl.append(lineIndicatorEl);
  cardEl.append(reviewText);
  cardEl.append(profielWrapperEl);

  currentUser++;
  if (currentUser >= users.length) {
    currentUser = 0;
  }
}

loadUserReviewCard();
let intervalId = setInterval(loadUserReviewCard, 8000);
