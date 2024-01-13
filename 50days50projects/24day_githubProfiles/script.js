const profileCard = document.querySelector(".profile-card");
const input = document.querySelector("input");

async function fetchData(apiURL) {
  let response = await fetch(apiURL);
  try {
    let data = await response.json();
    return data;
  } catch (error) {
    return console.log(error.message);
  }
}

async function recentRepos(repoURL) {
  let repos = await fetch(repoURL);
  try {
    let allRepositories = await repos.json();
    let repositoryDetails = [];

    allRepositories.forEach((repos, index) => {
      repositoryDetails.push({
        repoName: repos.name,
        reposActiveURL: repos.html_url,
        reposDate: repos.pushed_at,
      });
    });
    // let filteredRepos = repositoryDetails.filter((repos, index) => {
    //   return repos.reposDate.slice(0, 4) > 2023;
    // });
    let filteredRepos = repositoryDetails.map((repos) => {
      repos;
    });
    console.log(filteredRepos);
    // return data;
  } catch (error) {
    return console.log(error.message);
  }
}

recentRepos("https://api.github.com/users/itz-mohit-014/repos");

async function findUser(e) {
  let userName = e.currentTarget.value;
  e.currentTarget.value = "";
  const apiURL = `https://api.github.com/users/${userName}`;

  let profileData = await fetchData(apiURL);
  let profileImg = profileData.avatar_url;
  let name = profileData.name;
  let bio = profileData.bio;
  let follower = profileData.followers;
  let following = profileData.following;
  let repoURL = profileData.repos_url;
  let recentRepository = await recentRepos(repoURL);

  // recentRepos(repos);
  let cardContent = ` 
      <div class="profile-pic left">
      <img src="../profile13.jpg" alt="userProfile" />
    </div>
    <div class="user-details right">
      <h1 class="user-name">Mohit</h1>
      <p class="user-about">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
        molestias laboriosam consequuntur nesciunt earum sapiente
        reprehenderit, excepturi sint explicabo aliquam?
      </p>
      <div class="follower-container">
        <p>16562 <strong>Followers</strong></p>
        <p>0 <strong>Following</strong></p>
        <p>20 <strong>Repos</strong></p>
      </div>
      <div class="tags-container">
        <p class="tags">Lorem, ipsum.</p>
        <p class="tags">Lorem, ipsum. Lorem</p>
        <p class="tags">Lorem, ipsum. tags</p>
      </div>
    </div>
    
    `;
  profileCard.classList.add("show");
  profileCard.innerHTML = cardContent;
}

input.addEventListener("change", findUser);
