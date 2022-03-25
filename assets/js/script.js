var highscoreEl = document.querySelector(".highscore-button");
var startContentEl = document.querySelector(".start-content");
var startEl = document.querySelector(".start-button");
var timerEl = document.querySelector(".timer");
var questionContentEl = document.querySelector(".question-content");
var questionEl = document.querySelector(".question");
var answersEl = document.querySelector(".answers");
var currentQuestionIndex = 0;
// var answeredQuestions = []; This was potential for a random order if I wanted to implement that
var questions = [
  {
    question: "What punctuation ends a method in Javascript?",
    answers: ["comma", "apostrophe", "parentheses", "period"],
    answer: 0,
  },
  {
    question: "What keyword defines a variable in Javascript?",
    answers: ["const", "var", "let", "All of the above"],
    answer: 0,
  },
  {
    question:
      "How would you present a popup message to the user in Javascript?",
    answers: [
      "window.alert()",
      "console.log()",
      "document.open()",
      "window.popup()",
    ],
    answer: 0,
  },
  {
    question: "What are three main front end languages?",
    answers: [
      "Javascript, HTML, CSS",
      "Markdown, Javascript, CSS",
      "HTML, CSS, Java",
      "HTML, Java, Angular",
    ],
    answer: 0,
  },
  {
    question:
      "Which function is used to serialize an object into a JSON string in Javascript?",
    answers: ["stringify()", "parse()", "convert()", "All of the above"],
    answer: 0,
  },
];

startEl.addEventListener("click", function () {
  startContentEl.style.display = "none";
  timer();
});

function showQuestions() {
  var quizQuestion = questions[currentQuestionIndex];
  answersEl.innerHTML = "";
  questionEl.textContent = quizQuestion.question;
  quizQuestion.answers.forEach(function (answer) {
    var liEl = document.createElement("li");
    liEl.textContent = answer;
    answersEl.appendChild(liEl);
  });

  if (currentQuestionIndex === questions.length - 1) {
    currentQuestionIndex = 0;
  } else {
    currentQuestionIndex++;
  }
}

function timer() {
  timeRemaining = 60;
  console.log(timeRemaining);
  timerEl.textContent = timeRemaining;
  let interval = setInterval(function () {
    showQuestions();
    timeRemaining--;
    timerEl.textContent = timeRemaining;
    if (timeRemaining === 0) {
      // lossScore++;
      // lossScoreDisplayEl.textContent = lossScore;
      clearInterval(interval);
    }
  }, 1000);
}
