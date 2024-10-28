const questions = [
    {
        question: "What's the best thing about our friendship?",
        answers: [
            {text: "Laughter", correct: false},
            {text: "Trust", correct: true},
            {text: "Fun", correct: false},
            {text: "Support", correct: false},
        ]
    },
    {
        question: "What do you think makes us such good friends?",
        answers: [
            {text: "Understanding", correct: true},
            {text: "Honestly", correct: false},
            {text: "Similar interests", correct: false},
            {text: "Always there for each other", correct: false},
        ]
    },
    {
        question: "What was your first thought when we became friends?",
        answers: [
            {text: "Cool person", correct: false},
            {text: "Great vibes", correct: false},
            {text: "Interesting", correct: true},
            {text: "Fun to be around", correct: false},
        ]
    },
    {
        question: "What's the best memory we've created together?",
        answers: [
            {text: "A trip we took", correct: false},
            {text: "A fun event we attended", correct: false},
            {text: "Hanging out", correct: true},
            {text: "Our lab exam atrocities", correct: true},
        ]
    },
    {
        question: "What's one word you'd use to describe our conversations?",
        answers: [
            {text: "Funny", correct: false},
            {text: "Deep", correct: true},
            {text: "Random", correct: false},
            {text: "Interesting", correct: false},
        ]
    },
    {
        question: "What do you think will keep us friends for life?",
        answers: [
            {text: "Trust", correct: false},
            {text: "Laughter", correct: false},
            {text: "Support", correct: false},
            {text: "Shared memories", correct: true},
        ]
    },
    {
        question: "What's our favourite way to communicate each other?",
        answers: [
            {text: "Texting", correct: false},
            {text: "Phone calls", correct: false},
            {text: "Face-to-Face", correct: false},
            {text: "Social media", correct: false},
        ]
    },
    {
        question: "Which quality of mine do you appreciate most?",
        answers: [
            {text: "kindness", correct: false},
            {text: "Humor", correct: false},
            {text: "Loyality", correct: false},
            {text: "None of the above :)", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;   

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! &#128516;` ;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();