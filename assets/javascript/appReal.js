let counter = 3;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;


function nextQuestion () {
    
    const noMoreQuestions = (quizQuestions.length - 1) === currentQuestion;

    if (noMoreQuestions) {
        //TODO
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
    counter= 3;
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
        console.log("Winner!")
    } else {
        lost++;
        console.log("Loser!")
    }

    console.log("clicked: " + selectedAnswer);
})


loadQuestion();