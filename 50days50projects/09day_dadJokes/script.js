const submitBtn = document.querySelector(".load-joke");

async function loadNewJokes() {
  const jokeTextContainer = submitBtn.previousElementSibling;

  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json("");
  jokeTextContainer.innerHTML = data.joke;
}

loadNewJokes();

submitBtn.addEventListener("click", loadNewJokes);
