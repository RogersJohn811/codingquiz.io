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

startBtn.addEventListener("click", renderQuestion);

function renderQuestion() {
    welcomeArea.style.display = "none";
    mainQuestionArea.style.display = "block";

    if (time === 0){
        endQuiz();
    }
}

intervalId = setInterval(updateTime, 1000);

questionEl.textContent = questions[questionIndex].title;
questionListEl.innerHTML = "";

var choices = questions[questionIndex].choices;

var choicesLenth = choices.length;

for (var i = 0; 1 < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    questionListEl.append(questionListItem);
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
    timerEl.textContent = time;
    time--;
    if (time === 0) {
      endQuiz();
    }
  }

  function endQuiz() {
    clearInterval(intervalId);
    setTimeout(showHighScore, 2000);
  }


  
function endQuiz() {
    clearInterval(intervalId);
    var body = document.body;
    body.innerHTML = "Game over, You scored " + correctCount;
    setTimeout(showHighScore, 2);
}

function showHighScore() {
    var name = prompt("Please enter your name");

    var high_scores = localStorage.getItem("scores");

    if (!high_scores) {
        high_scores = [];
    } else {
        high_scores = JSON.parse(high_scores);
    }

    high_scores.push({ name: name, score: correctCount });

    localStorage.setItem("scores", JSON.stringify(high_scores));

    high_scores.sort(function (a, b) {
        return b.score - a.score;
    });

    var contentUL = document.createElement("ul");

    for (var i = 0; i < high_scores.length; i++) {
        var contentLI = document.createElement("li");
        contentLI.textContent =
            "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
        contentUL.appendChild(contentLI);
    }

    document.body.appendChild(contentUL);
}

function updateTime() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        endQuiz();
    }
}

function renderQuestion() {

    if (time == 0) {
        updateTime();
        return;
    }

    intervalId = setInterval(updateTime, 1000);
    questionEl.textContent = questions[questionIndex].question;

    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";

    var choices = questions[questionIndex].choices;
    var choicesLenth = choices.length;

    for (var i = 0; i < choicesLenth; i++) {
        var questionListItem = document.createElement("li");
        questionListItem.textContent = choices[i];
        optionListEl.append(questionListItem);
    }
}

function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
        time = 0;
    }
    renderQuestion();
}

function checkAnswer(event) {
    clearInterval(intervalId);
    if (event.target.matches("li")) {
        var answer = event.target.textContent;
        if (answer === questions[questionIndex].answer) {
            questionResultEl.textContent = "Correct";
            correctCount++;
        } else {
            questionResultEl.textContent = "Incorrect";
            time = time - 2;
            timerEl.textContent = time;
        }
    }
    setTimeout(nextQuestion, 2000);
}

renderQuestion();
optionListEl.addEventListener("click", checkAnswer);