const profileCard = document.querySelector(".profile-card");
const input = document.querySelector("input");

async function fetchData(apiURL) {
  let response = await fetch(apiURL);
  try {
    let data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}

async function repositories(repoURL) {
  let allRepositories = await fetchData(repoURL);
  try {
    let recentRepository = allRepositories.slice(0, 5).map((repos) => {
      return {
        name: repos.name,
        url: repos.html_url,
      };
    });
    return recentRepository;
  } catch (error) {
    return (error.message = "Repository Not Found");
  }
}

async function showCard(e) {
  let inputName = e.currentTarget.value;
  e.currentTarget.value = "";
  const apiURL = `https://api.github.com/users/${inputName} `;
  let profileData = await fetchData(apiURL);
  let userName = profileData.name;
  try {
    profileCard.classList.add("show");
    profileCard.innerHTML = "";
    let recentRepository = await repositories(
      profileData.repos_url + "?sort=created"
    );

    createProfileCard(profileData, userName);
    appendRepository(recentRepository);
  } catch (error) {
    profileCard.innerHTML = "User Not Found";
  }
}

function createProfileCard(profileData, userName) {
  const userProfileContainer = document.createElement("div");
  userProfileContainer.className = "profile-pic left center";
  userProfileContainer.innerHTML = `
    <img src="${profileData.avatar_url}" alt="userProfile" />`;

  const cardRightDetails = document.createElement("div");
  cardRightDetails.className = "user-details right";
  cardRightDetails.innerHTML = `
    <h1 class="user-name"><a href="${profileData.html_url}" target="_blank">
    ${userName.slice(0, 1).toUpperCase() + userName.slice(1)}
    </a>
    </h1>
    
    <p class="user-about">
    ${profileData.bio || ""}
    </p>
    
    <div class="follower-container">
    <p>${profileData.followers} <strong>Followers</strong></p>
    <p>${profileData.following} <strong>Following</strong></p>
    <p>${profileData.public_repos} <strong>Repos</strong></p>
    </div>
    `;

  profileCard.append(userProfileContainer);
  profileCard.append(cardRightDetails);
}

function appendRepository(repositoryData) {
  const repoContainer = document.createElement("div");
  repoContainer.classList.add("tags-container");
  repositoryData.forEach((repo) => {
    const tagEl = document.createElement("a");
    tagEl.href = repo.url;
    tagEl.target = "_blank";
    tagEl.classList.add("tags");
    tagEl.innerText = repo.name;
    repoContainer.append(tagEl);
  });

  profileCard.children[1].append(repoContainer);
}

input.addEventListener("change", showCard);
