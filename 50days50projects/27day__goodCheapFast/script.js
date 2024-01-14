const inputCheckbox = Array.from(document.getElementsByTagName("input"));
let firstChoice = null;
let secondChoice = null;

let selectChoice = {
  firstChoice,
  secondChoice,
};

function anyTwoChoice(e) {
  if (e.target.checked) {
    if (!selectChoice.firstChoice) {
      selectChoice.firstChoice = e.target;
    } else if (!selectChoice.secondChoice) {
      selectChoice.secondChoice = e.target;
    } else {
      inactiveChoice(selectChoice.firstChoice);
      selectChoice.firstChoice = e.target;
    }
  } else {
    if (selectChoice.firstChoice === e.target) {
      selectChoice.firstChoice = null;
    } else if (selectChoice.secondChoice === e.target) {
      selectChoice.secondChoice = null;
    }
  }
}

function inactiveChoice(choice) {
  choice.checked = false;
}

inputCheckbox.forEach((chechbox) => {
  chechbox.addEventListener("change", anyTwoChoice);
});
