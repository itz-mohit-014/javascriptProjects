const mainGalleryContainer = document.querySelector(".container");

for (let i = 0; i < 15; i++) {
  showImage();
}

const reloadImgBtn = document
  .getElementById("reloadAgain")
  .addEventListener("click", (e) => {
    location.reload();
  });

async function fetchRandomImages() {
  const url = "https://source.unsplash.com/random/";
  let res = await fetch(url);
  let imgURl = res.url;
  return imgURl;
}
async function addImg(imgWrapper) {
  const img = document.createElement("img");
  img.src = await fetchRandomImages();
  img.alt = "Random Image from Unsplesh";

  imgWrapper.appendChild(img);
}

async function showImage() {
  const imgWrapper = document.createElement("div");
  imgWrapper.className = "image-wrapper loading";
  mainGalleryContainer.appendChild(imgWrapper);
  addImg(imgWrapper);
}
