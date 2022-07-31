// Access html elements through variable
var scores = document.querySelector("#scores");
var timer = document.querySelector("#timer");
var container = document.querySelector("#container");
var title = document.querySelector("#title");
var content = document.querySelector("#content");
var btnStart = document.querySelector("#start");

// Create global variable and assign default value
var spanEl = [];
var timeLeft = 95;
var isQuizRunning = false;
var optionList = [];
var currentQues = 0;
let score = 0;
let isCorrect = false;
let isClearAnswer = false;
let clearAnswerCode = 0;
var scoreBoard = [];

// Initial method call
function init() {
  btnStart.addEventListener("click", questionListLoop); //Listner event for start button
  scores.addEventListener("click", showScores); // Listner event for score button
}

// Method to create dynamic button for options, call timer method and nextQuestion
function questionListLoop() {
  setTimer(); // call timer function
  isQuizRunning = true;
  btnStart.setAttribute("style", "display:none");
  content.setAttribute("style", "display:none");
  let numofOption = questionList[0].options.length;
  for (let i = 0; i < numofOption; i++) {
    let option = document.createElement("button");
    container.appendChild(option);
    optionList.push(option);
    option.setAttribute("id", "button" + (i + 1));
  }
  let spanTag = document.createElement("span");
  container.appendChild(spanTag);
  spanEl.push(spanTag);
  spanTag.setAttribute("id", "answer");
  nextQuestion();
}

// Countdown timer and ends quiz if time value is zero.
function setTimer() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    timeLeft--;
    timer.textContent = "Time: " + timeLeft + " seconds";

    if (timeLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      if (title.textContent != "All Done.") {
        endOfQuiz();
      }
    }
  }, 1000);
}

//Check If you have next question if not then it's end of quiz
function nextQuestion(event) {
  writeAnswer(event);
  if (currentQues < questionList.length) {
    changeQuestion();
  } else {
    endOfQuiz();
  }
}

//Check answer is correct ot not and displayed it.
// Also add score if answer is correct and update time if answer is incorrect
function writeAnswer(event) {
  var span = document.getElementById("answer");
  if (event != undefined) {
    if (
      event.currentTarget.textContent === questionList[currentQues - 1].answer
    ) {
      isCorrect = true;
      span.textContent = "Correct";
      span.setAttribute("style", "color:green");
      score += 10;
    } else {
      isCorrect = false;
      span.textContent = "Incorrect";
      span.setAttribute("style", "color:red");
      if (timeLeft > 10) {
        timeLeft -= 10;
      } else {
        timeLeft = 1;
      }
      timer.setAttribute("style", "color:red");
      setTimeout(function () {
        timer.setAttribute("style", "color: black");
      }, 1000);
    }
    clearAnswer();
  }
}

// clear the content and check if timeout is set
function clearAnswer() {
  var span = document.getElementById("answer");
  if (isClearAnswer) {
    isClearAnswer = false;
    clearTimeout(clearAnswerCode);
    clearAnswer();
  } else {
    isClearAnswer = true;
    clearAnswerCode = setTimeout(function () {
      span.textContent = "";
      isClearAnswer = false;
    }, 3000);
  }
}

// Change the question for each button
function changeQuestion() {
  if (questionList[currentQues].options.length <= 2) {
    optionList[2].style.display = "none";
    optionList[3].style.display = "none";
  } else {
    optionList[2].style.display = "block";
    optionList[3].style.display = "block";
  }
  title.textContent = questionList[currentQues].question;
  title.setAttribute("style","align-self:start")
  for (let i = 0; i < questionList[currentQues].options.length; i++) {
    optionList[i].textContent = questionList[currentQues].options[i];
    optionList[i].addEventListener("click", nextQuestion);
  }

  currentQues++;
}

// clear options and display scores, create input fields
function endOfQuiz() {
  title.textContent = "All Done.";
  timeLeft = 1;
  clearOptions();
  clearAnswer();
  content.setAttribute("style", "display:visible");
  content.textContent = "Your final score is : " + score;
  inputFields();
}

// Remove options button
function clearOptions() {
  for (let i = 0; i < optionList.length; i++) {
    optionList[i].remove();
  }
  optionList = [];
}

// create the form
function inputFields() {
  let initialsForm = document.createElement("form");
  container.appendChild(initialsForm);
  initialsForm.setAttribute("id", "form");
  let label = document.createElement("label");
  initialsForm.appendChild(label);
  label.textContent = "Enter initials: ";
  let input = document.createElement("input");
  initialsForm.appendChild(input);
  input.setAttribute("id", "initials");
  let submit = document.createElement("button");
  initialsForm.appendChild(submit);
  submit.setAttribute("id", "submit");
  submit.textContent = "Submit";

  title.setAttribute("style", "align-self: start");
  content.setAttribute("style", "align-self: start; font-size: 150%");
  // Add events
  input.addEventListener("keydown", stopReload);
  submit.addEventListener("click", addScore);
}

// Prevent entery field from reloading page
function stopReload(event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
}

// Add score and call savescore method
function addScore(event) {
  if (event !== undefined) {
    event.preventDefault(); // prevent default form field
  }
  let id = document.getElementById("initials");
  if (id.value.length > 2 || id.value.length === 0) {
    invalidInput();
    return;
  }
  isQuizRunning = false;
  document.getElementById("form").remove();
  saveScore(id);
}

// Add the score to the local storage
function saveScore(id) {
  if (localStorage.getItem("scoreBoard") !== null) {
    scoreBoard = JSON.parse(localStorage.getItem("scoreBoard"));
  }

  scoreBoard.push({ key: id.value, value: score });
  localStorage.setItem("scoreBoard", JSON.stringify(scoreBoard));
  showScores();
}

// Message is displayed if invalid input is given and set click event to submit button
function invalidInput() {
  alert("Please, Initials must be entered and two characters.");
  clearAnswer();
  let submit = document.getElementById("submit");
  submit.addEventListener("click", addScore);
}

//Update title, message and write scores
function showScores() {
  var span = document.getElementById("answer");
  if (!isQuizRunning) {
    title.textContent = "High Scores";
    btnStart.setAttribute("style", "display:none");
    writeScores();
    createEndButtons();
  } else if (title.textContent === "All Done.") {
    span.textContent = "Please, enter your initials first";
    span.setAttribute("style", "color: black");
    clearAnswer();
  } else {
    span.textContent = "You can't view scores until the quiz is over";
    span.setAttribute("style", "color: black");
    clearAnswer();
  }
}

// write content through loop and displayed score
function writeScores() {
  content.textContent = "";
  content.setAttribute("style", "white-space: pre-wrap; font-size: 150%");
  if (localStorage.getItem("scoreBoard") !== null) {
    scoreBoard = JSON.parse(localStorage.getItem("scoreBoard"));
  }
  // Sort array object by score
  scoreBoard.sort((a, b) => b.value - a.value);

  let limit = 5;
  if (limit > scoreBoard.length) {
    limit = scoreBoard.length;
  }
  for (let i = 0; i < limit; i++) {
    content.textContent +=
      "Initial:   " +
      scoreBoard[i].key +
      "   Score:   " +
      scoreBoard[i].value +
      "\n";
  }
}

// Clears local storage, content and array holding scores
function clearScores() {
  localStorage.clear();
  content.textContent = "";
  scoreBoard = [];
}

// create buttons and set listener click event
function createEndButtons() {
  var subDiv = document.createElement("div")
  subDiv.setAttribute("id","subcontainer")
  subDiv.setAttribute("style","flex-direction:row;")
  container.appendChild(subDiv)
  if (!document.getElementById("restart")) {
    let buttonEl = document.createElement("button");
    subDiv.appendChild(buttonEl);
    buttonEl.textContent = "Go Back";
    buttonEl.setAttribute("id", "restart");

    let clearButtonEl = document.createElement("button");
    subDiv.appendChild(clearButtonEl);
    clearButtonEl.textContent = "Clear High Scores";
    clearButtonEl.setAttribute("id", "clearScores");

    buttonEl.addEventListener("click", restart);
    clearButtonEl.addEventListener("click", clearScores);
  }
}

// Remove current buttons, sets the title and contents original and start button visible
function restart() {
  title.setAttribute("style", "align-self: center");
  content.setAttribute("style", "align-self: center; font-size: 110%");
  document.getElementById("restart").remove();
  document.getElementById("clearScores").remove();
  document.getElementById("subcontainer").remove();
  title.textContent = "Coding Quiz Challenge";
  content.textContent =
    "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by reducing it by ten seconds.";
  start.setAttribute("style", "display: visible");
  document.getElementById("answer").remove();
  currentQues = 0;
  score = 0;
  timeLeft = 95;
  init();
}

// Call init method first
init();
