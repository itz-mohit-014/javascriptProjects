const quizQuestions = [
  {
    question: "What does HTML stand for?",
    options: {
      A: "HyperText Markup Language",
      B: "High-Level Text Language",
      C: "Hyper Transfer Markup Language",
      D: "Hyperlink and Text Markup Language",
    },
    correctAnswer: "A",
  },
  {
    question: "Which HTML tag is used for creating an unordered list?",
    options: {
      A: "&lt;ol&gt;",
      B: "&lt;li&gt;",
      C: "&lt;ul&gt;",
      D: "&lt;dl&gt;",
    },
    correctAnswer: "C",
  },
  {
    question: "What is the purpose of the <head> tag in HTML?",
    options: {
      A: "It defines the main content of the document.",
      B: "It contains metadata about the document.",
      C: "It specifies the title of the document.",
      D: "It represents the main heading of the document.",
    },
    correctAnswer: "B",
  },
  {
    question: "How can you include external stylesheets in your HTML document?",
    options: {
      A: "&lt;style&gt;",
      B: "&lt;link&gt;",
      C: "&lt;css&gt;",
      D: "&lt;script&gt;",
    },
    correctAnswer: "B",
  },
  {
    question: "How can you apply multiple styles to an element in CSS?",
    options: {
      A: "Using multiple class attributes",
      B: "Separating styles with commas",
      C: "Using the &lt;style&gt; tag",
      D: "Inline styles only",
    },
    correctAnswer: "A",
  },
  {
    question: "How can you center an element horizontally in CSS?",
    options: {
      A: "text-align: center;",
      B: "margin: auto;",
      C: "align: center;",
      D: "float: center;",
    },
    correctAnswer: "B",
  },
  {
    question:
      "What is the purpose of the addEventListener method in JavaScript?",
    options: {
      A: "To create a new event",
      B: "To remove an event",
      C: "To attach an event handler to an element",
      D: "To listen for keyboard events only",
    },
    correctAnswer: "C",
  },
  {
    question: "What is the purpose of the typeof operator in JavaScript?",
    options: {
      A: "To determine the type of a variable",
      B: "To define a new data type",
      C: "To check if a variable is defined",
      D: "To convert a variable to a different type",
    },
    correctAnswer: "A",
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: {
      A: "var",
      B: "const",
      C: "let",
      D: "All of above",
    },
    correctAnswer: "D",
  },
  {
    question: "Which tag is used for creating a hyperlink in HTML?",
    options: {
      A: "&lt;link&gt;",
      B: "&lt;a&gt;",
      C: "&lt;href&gt;",
      D: "&lt;hyperlink&gt;",
    },
    correctAnswer: "B",
  },
];

const quesAnsWrapper = document.querySelector(".top");
const submitBtn = document.getElementById("submitBtn");
const userSelectAnsersList = [];
let userCurrentQuizAnswer = null;

function AddQuestions(questionObj) {
  const questionEl = document.createElement("h1");
  questionEl.classList.add("questions");
  questionEl.innerText = questionObj.question;

  const answerWrapper = document.createElement("div");
  answerWrapper.classList.add("answers-wrapper");
  answerWrapper.innerHTML = `
  
    <div class="options">
        <input type="radio" name="answers" id="optAnswer1" />
        <label for="optAnswer1">${questionObj.options.A}</label>
    </div>
    <div class="options">
        <input type="radio" name="answers" id="optAnswer2" />
        <label for="optAnswer2">${questionObj.options.B}</label>
    </div>

    <div class="options">
        <input type="radio" name="answers" id="optAnswer3" />
        <label for="optAnswer3">${questionObj.options.C}</label>
    </div>

    <div class="options">
        <input type="radio" name="answers" id="optAnswer4" />
        <label for="optAnswer4">${questionObj.options.D}</label>
    </div>
`;
  quesAnsWrapper.innerHTML = "";
  quesAnsWrapper.appendChild(questionEl);
  quesAnsWrapper.appendChild(answerWrapper);
  userCurrentQuizAnswer = null;
  const allInputs = Array.from(document.getElementsByTagName("input"));
  allInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      userCurrentQuizAnswer = e.target.nextElementSibling.innerHTML;
      toggleBtnState();
    });
  });
}

let quizNumber = 0;
AddQuestions(quizQuestions[quizNumber]);

function toggleBtnState() {
  if (userCurrentQuizAnswer == null) {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
}

let eventId = submitBtn.addEventListener("click", (e) => {
  userSelectAnsersList.push(userCurrentQuizAnswer);
  if (quizNumber > 8) {
    showResult();
    submitBtn.innerText = "Try Again";
    quizNumber = 0;
    return;
  }
  quizNumber++;
  AddQuestions(quizQuestions[quizNumber]);
  toggleBtnState();
});

function showResult() {
  let correctAnswer = 0;
  userSelectAnsersList.forEach((answer, idx) => {
    let rightAnswer =
      quizQuestions[idx].options[quizQuestions[idx].correctAnswer];
    if (answer == rightAnswer) {
      correctAnswer++;
    }
  });

  const questionEl = document.createElement("h1");
  questionEl.classList.add("questions");

  quesAnsWrapper.innerHTML = "";

  if (correctAnswer > 7) {
    questionEl.innerText = "Excellent, ";
    questionEl.style.color = "#008000";
  } else if (correctAnswer > 4) {
    questionEl.innerText = "Great, ";
    questionEl.style.color = "#00a6ff";
  } else {
    questionEl.innerText = "Good Luck, ";
    questionEl.style.color = "#ff0000";
  }
  questionEl.innerText += `You answered ${correctAnswer} out of 10 questions correctly`;
  quesAnsWrapper.appendChild(questionEl);
}
