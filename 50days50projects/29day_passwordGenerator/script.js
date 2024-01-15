const submitBtn = document.getElementById("generatePassword");
const displayPassword = document.getElementById("show-password");
const clipboardEl = document.getElementById("clipboardCopy");
const passwordLength = document.getElementById("passLength");

function generateRandomPassword(e) {
  let randomPassword = "";
  let selectedOptionList = [];

  const allOptions = Array.from(
    document.querySelectorAll('input[type="checkbox"]')
  );
  allOptions.forEach((option) => {
    if (option.checked) {
      selectedOptionList.push(option);
    }
  });

  if (selectedOptionList.length == 0) {
    displayPassword.value = "Option Not Selected";
    return;
  }
  // let [upperEl, lowerEl, numberEl, symbolEl] = allOptions;

  for (let i = 0; i < passwordLength.value; i++) {
    if (selectedOptionList.length > 1) {
      for (let j = 0; j < selectedOptionList.length; j++) {
        let option =
          selectedOptionList[
            Math.trunc(Math.random() * selectedOptionList.length)
          ].dataset.value;
        randomPassword += addRandomChar(option);
        break;
      }
    } else {
      let option = selectedOptionList[0].dataset.value;
      randomPassword += addRandomChar(option);
    }
  }

  displayPassword.value = randomPassword;
}

function addRandomChar(option) {
  let generatePassword = "";
  switch (option) {
    case "upperLetters":
      generatePassword = getRandomUppercaseLetter();
      break;
    case "lowerLetters":
      generatePassword = getRandomLowercaseLetter();
      break;
    case "numbers":
      generatePassword = getRandomNumber();
      break;
    case "symbols":
      generatePassword = getRandomSymbol();
      break;
  }
  return generatePassword;
}
function getRandomUppercaseLetter() {
  const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return upperLetters[Math.trunc(Math.random() * upperLetters.length)];
}
function getRandomLowercaseLetter(length) {
  const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
  return lowerLetters[Math.trunc(Math.random() * lowerLetters.length)];
}
function getRandomNumber(length) {
  const numbers = "1234567890";
  return numbers[Math.trunc(Math.random() * numbers.length)];
}
function getRandomSymbol(length) {
  const symbols = '!@#$%^&*()_+{}|:"><?;./,';
  return symbols[Math.trunc(Math.random() * symbols.length)];
}

submitBtn.addEventListener("click", generateRandomPassword);

clipboardEl.addEventListener("click", () => {
  navigator.clipboard.writeText(displayPassword.value);
});
