var highscoreEl = document.querySelector(".highscore-button");
var startEl = document.querySelector(".start-button");
var timerEl = document.querySelector(".timer");

startEl.addEventListener("click", function () {
  // createBlankWord(word);
  timer();
});

function timer() {
  timeRemaining = 60;
  console.log(timeRemaining);
  timerEl.textContent = timeRemaining;
  let interval = setInterval(function () {
    timeRemaining--;
    timerEl.textContent = timeRemaining;
    if (timeRemaining === 0) {
      // lossScore++;
      // lossScoreDisplayEl.textContent = lossScore;
      clearInterval(interval);
    }
  }, 1000);
}