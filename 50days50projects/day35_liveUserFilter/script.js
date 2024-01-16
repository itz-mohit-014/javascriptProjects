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

function filterUser(text) {
  const allUserEntries = Array.from(
    document.getElementsByClassName("right user-details")
  );
  allUserEntries.forEach((userEntry, idx) => {
    // if (text == userEntry.innerText )
    // console.log(userEntry.innerText);
  });
}

inputSearchEl.addEventListener("input", filterUser);
