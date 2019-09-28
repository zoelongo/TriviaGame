let counter = 5;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;


function nextQuestion () {
    
    const noMoreQuestions = (quizQuestions.length - 1) === currentQuestion;

    if (noMoreQuestions) {
        displayResult();
        console.log("Game Over!");
    } else {
        currentQuestion++;
        loadQuestion();
    }

}

function timeUp () {
    clearInterval(timer);
    lost++;
    nextQuestion();
}

function countDown () {
    counter--;

    $("#time").html("Time Left: "  +  counter);

    if (counter === 0) {
        timeUp();
    }
}

function loadQuestion () {
    counter= 5;
    timer= setInterval(countDown, 1000)

    const question = quizQuestions[currentQuestion].question;
    const options = quizQuestions[currentQuestion].options;

    $("#time").html("Time Left: " + counter);

    $("#game").html(`
        <h3>${question}</h3>
        ${loadOptions(options)}
    `);
}

function loadOptions (options) {
    let result = "";
    for (let i = 0; i < options.length; i++) {
        result += `<p class="option" data-answer="${options[i]}">${options[i]}</p>`;

    }

    return result;
}

$(document).on("click", ".option", function(){
    clearInterval(timer);
    const selectedAnswer = $(this).attr("data-answer");
    const correctAns = quizQuestions[currentQuestion].correctAns;

    if (correctAns === selectedAnswer) {
        //TODO
        score++;
        console.log("Winner!");
        nextQuestion();
    } else {
        lost++;
        console.log("Loser!");
        nextQuestion();
    }

    console.log("clicked: " + selectedAnswer);
})

function displayResult() {
    const result = `
        <p><ol>You answered ${score} questions correctly!</ol>
        <ol>...and you answered ${lost} questions incorrectly</ol>
        <ol>out of a total of ${quizQuestions.length} questions.</ol>
        </p>
        <button class"btn btn-primary" id="reset">Reset Game</button>
        
    `;

    $("#game").html(result);

}

$(document).on("click", "#reset", function(){

    counter = 5;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();

});

loadQuestion();