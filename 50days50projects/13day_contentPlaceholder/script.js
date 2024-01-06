const cardImg = document.querySelector(".top-img");
const imgTitle = document.querySelector(".title");
const imgDesc = document.querySelector(".desc");
const authorProfile = document.querySelector(".left-user-profile");
const authorName = document.querySelector(".name");
const postDate = document.querySelector(".date");

function loadData() {
  cardImg.innerHTML = `
        <img src="./card-img.avif" alt="user-profile" />
        `;
  imgTitle.innerHTML = `Lorem ipsum dolor sit.`;
  imgDesc.innerHTML = `            Lorem ipsum dolor sit amet consectetur adipisicing elit. At
        consectetur, sunt dolor aliquam ab omnis.`;
  authorProfile.innerHTML = `  <img src="../profile13.jpg" alt="user-profile" />`;
  authorName.innerHTML = "Alina Doe";
  postDate.innerHTML = "Oct 08, 2020";
  const allElementsBg = document.querySelectorAll(".loading");
  const allTextBg = document.querySelectorAll(".loading-txt");
  allElementsBg.forEach((el) => {
    el.classList.remove("loading");
  });
  allTextBg.forEach((text) => {
    text.classList.remove("loading-txt");
  });
}

setTimeout(loadData, 1500);
