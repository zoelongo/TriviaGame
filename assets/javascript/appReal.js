let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

function countDown () {
    counter--;

    $("#time").html("Time Left" + counter);
}

function loadQuestion () {
    counter= 30;
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


loadQuestion();