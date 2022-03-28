var highscoreButtonEl = document.querySelector(".highscore-button");
var highscoreEl = document.querySelector(".highscore-content");
var returnButtonEl = document.querySelector(".return-button");

var startContentEl = document.querySelector(".start-content");
var startButtonEl = document.querySelector(".start-button");

var questionContentEl = document.querySelector(".question-content");
var questionEl = document.querySelector(".question");
var answersEl = document.querySelector(".answer-block");

var timerEl = document.querySelector(".timer");
var doneScreenEl = document.querySelector(".doneScreen-content");
var userEl = document.querySelector("#user");
var scoreEl = document.querySelector(".score");
var submitButtonEl = document.querySelector(".submit-button");
var timeRemaining = timerEl.textContent;

var highscoreArray = [];
var currentQuestionIndex = 0;
var score = 0;
// var answeredQuestions = []; This was potential for a random order if I wanted to implement that
var questions = [
  {
    question: "What punctuation ends a method in Javascript?",
    answers: ["comma", "apostrophe", "parentheses", "period"],
    answer: 2,
  },
  {
    question: "What keyword defines a variable in Javascript?",
    answers: ["const", "var", "let", "All of the above"],
    answer: 3,
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

// There need to be four seperate screens.

// Start Screen
// Playing Screen
// Ending Add to High Score Screen
// Viewing all high scores screen

function init() {
  setEventListeners();
  questionContentEl.style.display = "none";
}

function setEventListeners() {
  startButtonEl.addEventListener("click", function () {
    startContentEl.style.display = "none";
    questionContentEl.style.display = "initial";
    timer();
    showQuestions();
  });

  highscoreButtonEl.addEventListener("click", function () {
    highscoreScreen();
    clearInterval(interval);
  });

  returnButtonEl.addEventListener("click", function () {
    startScreen();
  });

  submitButtonEl.addEventListener("click", function () {
    // create record object from submission
    var highScoreRecord = {
      firstName: userEl.value,
      highscore: score,
    };
    highscoreArray.push(highScoreRecord);

    highscoreScreen();
  });

  answersEl.addEventListener("click", function (event) {
    var target = event.target;
    var parentQuestion = document.querySelector(".question");

    for (var i = 0; i < questions.length; i++) {
      if (parentQuestion.textContent === questions[i].question) {
        var guessIndex = questions[i].answers.indexOf(target.textContent);
        if (guessIndex !== questions[i].answer) {
          timeRemaining -= 10;
        }
        showQuestions();
        break;
      }
    }
    // Display another element where it tells you it is wrong?
    // console.log("You guessed WRONG");
  });
}

function showQuestions() {
  gameOver();

  var quizQuestion = questions[currentQuestionIndex];
  answersEl.innerHTML = "";
  questionEl.textContent = quizQuestion.question;

  quizQuestion.answers.forEach(function (answer) {
    var liEl = document.createElement("li");
    liEl.className = "answer";
    liEl.textContent = answer;
    answersEl.appendChild(liEl);
  });

  currentQuestionIndex++;
}

function gameOver() {
  if (currentQuestionIndex === questions.length || timeRemaining === 0) {
    scoreEl.textContent = score;
    timeRemaining = 0;
    currentQuestionIndex = 0;
    clearInterval(interval);
    gameOverScreen();
  }
}

// if time remaining is zero then all the right answers need to be added up and stored so that the user can put it into the high score board
function timer() {
  timeRemaining = 60;
  timerEl.textContent = timeRemaining;
  interval = setInterval(function () {
    score = timeRemaining;
    timerEl.textContent = timeRemaining;
    if (timeRemaining <= 0) {
      clearInterval(interval);
      // Display a different screen if the time is at zero
      gameOver();
    }
    timeRemaining--;
  }, 1000);
}

function gameOverScreen() {
  questionContentEl.style.display = "none";
  doneScreenEl.style.display = "initial";
}

function highscoreScreen() {
  timerEl.textContent = 0;
  doneScreenEl.style.display = "none";
  startContentEl.style.display = "none";
  questionContentEl.style.display = "none";
  highscoreEl.style.display = "initial";

  // set new submission to local storage
  localStorage.setItem("highScoreRecord", JSON.stringify(highscoreArray));

  if (localStorage !== null) {
    var highScoreRecordArray = highScoreRecord.sort((a, b) =>
      a.score - b.score ? -1 : 1
    );
  }
}

function startScreen() {
  highscoreEl.style.display = "none";
  startContentEl.style.display = "initial";
  timerEl.textContent = 0;
}

init();
