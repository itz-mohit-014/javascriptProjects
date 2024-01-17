const inputSearchEl = document.getElementById("userFilterInput");
getUserData();
async function getUserData() {
  const randomUserApiRes = await fetch("https://randomuser.me/api?results=80");
  const data = await randomUserApiRes.json();
  const allUser = data.results;
  addDataToProfiles(allUser);
}

function addDataToProfiles(allUser) {
  const userProfileParentEl = document.querySelector(".bottom-user-body");
  userProfileParentEl.innerHTML = "";
  allUser.forEach((user) => {
    const creatLi = document.createElement("li");
    creatLi.classList.add("user");
    creatLi.innerHTML = `
        <div class="left-user-profile">
            <img src="${user.picture.medium}" alt=" userProfile" />
          </div>
          <div class="right user-details">
            <p class="user-name">${user.name.first} ${user.name.last}</p>
            <p class="user-location">${user.location.state}, ${user.location.country}</p>
          </div>
        `;

    userProfileParentEl.append(creatLi);
  });
}

function filterUser(e) {
  const text = e.target.value.toLowerCase();
  let allUser = Array.from(document.getElementsByClassName("user"));
  let userDetails = [];
  allUser.forEach((user) => {
    userDetails.push(user.innerText.split("\n\n").join().toLowerCase());
  });

  allUser.forEach((user) => {
    user.classList.remove("sorted");
  });

  userDetails.filter((detail, idx) => {
    return detail.includes(text) ? allUser[idx].classList.add("sorted") : null;
  });

  setTimeout(() => {
    allUser.forEach((user) => {
      if (user.classList.contains("sorted")) {
        user.style.display = "flex";
        console.log(user);
      } else {
        user.style.display = "none";
      }
    });
  }, 100);
}

inputSearchEl.addEventListener("input", filterUser);
