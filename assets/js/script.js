var highscoreButtonEl = document.querySelector(".highscore-button");
var highscoreEl = document.querySelector(".highscore-content");
var highscoreUsersEl = document.querySelector(".highscores");
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

/* This is the list of questions where answer is the index of the correct answer */
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

/* Establishes the start of the game and has a listener initializer */
function init() {
  setEventListeners();
  questionContentEl.style.display = "none";
}

/* Sets all event listeners for the site */
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
  });
}

/* Displays the question screen after checking if conditions have been met for a game over. */
function showQuestions() {
  gameOver();

  if (currentQuestionIndex < questions.length) {
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
}

/* Displays the game over screen if the time is zero or if all questions have been answered. */
function gameOver() {
  if (currentQuestionIndex === questions.length || timeRemaining === 0) {
    scoreEl.textContent = score;
    timeRemaining = 0;
    clearInterval(interval);
    gameOverScreen();
  }
}

/* This function fills the items of the high score list and sorts them. */
function fillHighScores() {
  var highScores = localStorage.getItem("highScoreRecord");
  var highScoresArray = JSON.parse(highScores);
  highscoreUsersEl.innerHTML = "";
  highScoresArray = highScoresArray.sort((a, b) => b.highscore - a.highscore);
  if (highScoresArray !== null) {
    highScoresArray.forEach(function (record) {
      var liEl = document.createElement("li");
      liEl.className = "highScore";
      liEl.textContent = record.firstName + ": " + record.highscore;
      highscoreUsersEl.appendChild(liEl);
    });
  }
}

/* This function displays the start screen. */
function startScreen() {
  highscoreEl.style.display = "none";
  startContentEl.style.display = "initial";
  timerEl.textContent = 0;
  currentQuestionIndex = 0;
}

/* This function displays the game over screen. */
function gameOverScreen() {
  questionContentEl.style.display = "none";
  doneScreenEl.style.display = "initial";
}

/* This function starts the display of the high score screen then calls to fill the high score list. */
function highscoreScreen() {
  timerEl.textContent = 0;
  doneScreenEl.style.display = "none";
  startContentEl.style.display = "none";
  questionContentEl.style.display = "none";
  highscoreEl.style.display = "initial";
  // set new submission to local storage
  localStorage.setItem("highScoreRecord", JSON.stringify(highscoreArray));

  fillHighScores();
}

/* Establishes the timer for the game and populates the score as it is based off of the timer. */
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

init();
