// Structure of questions
class Question {
  constructor(question, options, answer) {
    this.question = question;
    this.options = options;
    this.answer = answer;
  }
}

var questionList = [];

//Questions list with options and answer
const options1 = [
  "1. <javascript>",
  "2. <js>",
  "3. <scripting>",
  "4. <script>",
];
const question1 = new Question(
  "Inside which HTML element do we put the JavaScript?",
  options1,
  "4. <script>"
);
questionList.push(question1);

const options2 = ["1. False", "2. True"];
const question2 = new Question(
  "The external JavaScript file must contain the <script> tag.",
  options2,
  "1. False"
);
questionList.push(question2);

const options3 = [
  "1. local variables",
  "2. css selectors",
  "3. functions",
  "4. names",
];
const question3 = new Question(
  "What parameters can be passed into the query selector function?",
  options3,
  "2. css selectors"
);
questionList.push(question3);

const options4 = [
  "1. call myFunction",
  "2. call myFunction()",
  "3. call function myFunction()",
  "4. myFunction()",
];
const question4 = new Question(
  'How do you call a function named "myFunction"?',
  options4,
  "4. myFunction()"
);
questionList.push(question4);

const options5 = [
  "1. onmouseover",
  "2. onmousechange",
  "3. onclick",
  "4. onchange",
];
const question5 = new Question(
  "Which event occurs when the user clicks on an HTML element?",
  options5,
  "3. onclick"
);
questionList.push(question5);

const options6 = [
  "1. v carName;",
  "2. variable carName;",
  "3. var carName;",
  "4. var %car;",
];
const question6 = new Question(
  "How do you declare a JavaScript variable?",
  options6,
  "3. var carName;"
);
questionList.push(question6);

const options7 = ["1. *", "2. =", "3. -", "4. %"];
const question7 = new Question(
  "Which operator is used to assign a value to a variable?",
  options7,
  "2. ="
);
questionList.push(question7);

const options8 = ["1. True", "2. False"];
const question8 = new Question(
  "Is JavaScript case-sensitive?",
  options8,
  "1. True"
);
questionList.push(question8);

const options9 = ["1. alert", "2. confirm", "3. prompt", "4. all of above"];
const question9 = new Question(
  "What is the type of Pop up boxes available in JavaScript?",
  options9,
  "4. all of above"
);
questionList.push(question9);

const options10 = ["1. if", "2. ifthen", "3. ifelse", "4. switch"];
const question10 = new Question(
  "Which of the following do you use for a multi-way branch?",
  options10,
  "4. switch"
);
questionList.push(question10);
