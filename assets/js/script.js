var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var viewHighScores = document.querySelector("#viewHighScores");
var welcomeArea = document.querySelector(".welcome-area");
var startBtn = document.querySelector("#startBtn");
var mainQuestionArea = document.querySelector(".main-question-area");

var questionIndex = 0;
var correctCount = 0;
var time = 10;
var intervalId;

var name;

startBtn.addEventListener("click", startGame);

function startGame(){
  document.querySelector(".welcome-area").style.display="none";
  document.querySelector(".main-question-area").style.display="block";
  renderQuestion();
}

function renderQuestion() {

  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);

  questionEl.textContent = questions[questionIndex].question;
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  
  }
}

function checkAnswer(event) {
  clearInterval(intervalId);
  var target = event.target;

  if (target.matches("li")) {
    var selectedChoice = event.target.textContent;
    if (selectedChoice === questions[questionIndex].answer) {
      correctCount++;
      questionResultEl.textContent = "Correct!";
    }
    else {
      correctCount--;
      time -= 2;
      questionResultEl.textContent = "Incorrect.";
    }
  }
  setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
  questionResultEl.textContent = "";

  questionIndex++;

  if (questionIndex === questions.length) {
    timer = 0;
    endQuiz();
  } else {
    renderQuestion();
  }
}

function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(intervalId);
  setTimeout(showHighScore, 2000);
}

function showHighScore() {
  document.body.textContent = "";

  var div = document.createElement("div");
  div.setAttribute("class", "container highscores-display");
  document.body.append(div);


  var heading = document.createElement("h2");
  heading.textContent = "Add your name to the leaderboard!";
  div.append(heading);

  inputBox = document.createElement("input");
  inputBox.setAttribute("id", "nameBox");
  div.append(inputBox);


  btnSubmit = document.createElement("button");
  btnSubmit.setAttribute("type", "submit");
  btnSubmit.setAttribute("class", "customBtn");
  btnSubmit.textContent = "Submit Name";
  div.append(btnSubmit);

  btnSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    name = inputBox.value;
    toHighScore();
  });
}

function toHighScore() {
  clearInterval(intervalId);

  document.body.textContent = "";

  var high_score = localStorage.getItem("scores");

  if (!high_score) {
    high_score = [];
  } else {
    high_score = JSON.parse(high_score);
  }

  var user = {
    name: name,
    score: correctCount
  }

  high_score.push(user);
  localStorage.setItem("scores", JSON.stringify(high_score))
  high_score.sort(function (a, b) {
    return b.score - a.score;
  });

  var heading = document.createElement("h2");
  heading.textContent = "Highscores";

  var div = document.createElement("div");
  document.body.append(div);
  div.setAttribute("class", "container highscores-display");
  div.append(heading);

  var contentUL = document.createElement("ul");
  contentUL.setAttribute("id", "highscore-list");

  var button = document.createElement("button");
  button.setAttribute("class", "customBtn");
  button.textContent = "Go back";

  for (var i = 0; i < high_score.length; i++) {
    var contentLi = document.createElement("li");

    if (high_score[i].name != null && high_score[i].score != 0) {

      contentLi.innerHTML = `<strong>Name: </strong> ${high_score[i].name} <strong>Score:</strong> ${high_score[i].score}`
      contentUL.append(contentLi);
    }
  }
  div.append(contentUL);

  div.append(button);

  button.addEventListener("click", function () {
    location.reload()
  });
}

optionListEl.addEventListener("click", checkAnswer);

viewHighScores.addEventListener("click", toHighScore);