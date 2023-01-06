function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Question.prototype.checkAnswer = function (answer) {
    return this.answer === answer
};
function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}
Quiz.prototype.getQuestion = function () {
    return this.questions[this.questionIndex];
}
Quiz.prototype.isFinish = function () {
    return this.questions.length === this.questionIndex;
}
Quiz.prototype.quess = function (answer) {
    var question = this.getQuestion();
    if (question.checkAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
};
var q1 = new Question("What is the best programming", ["C#", "JavaScript", "Phyton", "asp.net"], "JavaScript");
var q2 = new Question("What is the most popular language", ["C#", "visual basic", "nedejs", "JavaScript"], "JavaScript");
var q3 = new Question("What is the best modern programming language", ["C#", "JavaScript", "Phyton", "asp.net"], "JavaScript");
var questions = [q1, q2, q3,];
var quiz = new Quiz(questions);
loadQuestion();
function loadQuestion() {
    if (quiz.isFinish()) {
        showScore();
    } else {
        var question = quiz.getQuestion();
        var choices = question.choices;
        document.querySelector("#question").textContent = question.text;
        for (var i = 0; i < choices.length; i++) {
            var element = document.querySelector("#choice" + i);
            element.innerHTML = choices[i];
            quess("btn" + i, choices[i]);
        };
        showProgress();
    }
};
function quess(id, quess) {
    var btn = document.getElementById(id);
    btn.onclick = function () {
        quiz.quess(quess);
        loadQuestion();
    }
};
function showScore() {
    var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;
    document.querySelector(".card-body").innerHTML = html;
};
function showProgress() {
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex + 1;
    document.querySelector("#progress").innerHTML = "Question " + questionNumber + " of " + totalQuestion;
};