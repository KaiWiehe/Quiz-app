let questions = [{
        "question": "Leonard und Penny küssen sich nach ihrem ersten Date im Flur: Was bemerkt Leonard an der Decke?",
        "answer_1": "Eine Überwachungskamera",
        "answer_2": "Sheldon hat eine Notiz aufgehängt",
        "answer_3": "Es hängt ein Mistelzweig über der Tür und deswegen küssen sie sich",
        "answer_4": "Die Lampe ist defekt",
        "right_answer": 1
    },
    {
        "question": "Wie oft klopft Sheldon an Pennys Tür?",
        "answer_1": "Drei mal",
        "answer_2": "Sechs mal",
        "answer_3": "Neun mal",
        "answer_4": "Zwölf mal",
        "right_answer": 3
    },
    {
        "question": "Wo hat Howard vor der Beziehung mit Bernadette gewohnt?",
        "answer_1": "Auf der Straße",
        "answer_2": "Bei seiner Mutter",
        "answer_3": "Bei seinem besten Freund Raj",
        "answer_4": "In seiner eigenen Wohnung",
        "right_answer": 2
    },
    {
        "question": "Wer heiratet zuerst?",
        "answer_1": "Leonard & Penny",
        "answer_2": "Raj & Bernadette",
        "answer_3": "Sheldon & Amy",
        "answer_4": "Howard & Bernadette",
        "right_answer": 4
    },
    {
        "question": "Was ist Raj's Problem mit Frauen?",
        "answer_1": "Er steht nicht auf Frauen",
        "answer_2": "Er kann nicht reden wenn eine Frau im Raum ist, außer unter Alkoholeinfluß",
        "answer_3": "Er kriegt eine schwache Blase wenn er mit einer Frau redet",
        "answer_4": "Er lernt nie eine Frau kennen",
        "right_answer": 2
    },
    {
        "question": "Welches Lied singt Penny Sheldon vor wenn er krank ist?",
        "answer_1": "Katzentanzlied",
        "answer_2": "Kommt ein Vogel geflogen",
        "answer_3": "Hänsel und Gretel",
        "answer_4": "Old Macdonald Had a Farm",
        "right_answer": 1
    },
    {
        "question": "Wo im Appartement von Leonard und Sheldon befindet sich eine Kamera?",
        "answer_1": "In der Deckenlampe",
        "answer_2": "In der Aquaman Figur",
        "answer_3": "In der Küche",
        "answer_4": "Hinter einem Buch",
        "right_answer": 2
    },
    {
        "question": "In welcher Staffel kommt Amy dazu?",
        "answer_1": "In der zweiten Staffel",
        "answer_2": "In der dritten Staffel",
        "answer_3": "In der vierten Staffel",
        "answer_4": "In der fünften Staffel",
        "right_answer": 2
    },
    {
        "question": "Wie nennen die anderen Sheldon und Amy auch?",
        "answer_1": "Die Besserwisser",
        "answer_2": "Freaks",
        "answer_3": "Es gibt keinen Spitznamen",
        "answer_4": "Shamy",
        "right_answer": 4
    },
    {
        "question": "Hat Sheldon Geschwister?",
        "answer_1": "Er hat keine Geschwister",
        "answer_2": "Einen Zwillingsbruder",
        "answer_3": "Eine Schwester",
        "answer_4": "Eine Zwillingsschwester und einen Bruder",
        "right_answer": 4
    },
];

let score = 0; /* der punktestand startet bei 0 und wird bei jeder richtigen antwort um 1 erhöht */
let currentQuestion = 0; /* Der anfangswert, damit er bei dem ersten json array inhalt anfängt */
let audio_good = new Audio('good.mp3'); /* audio "Richtige Frage" */
let audio_wrong = new Audio('wrong.mp3'); /* audio "Falsche Frage" */

function init() {
    let question_lenght = document.getElementById('question_lenght');
    question_lenght.innerHTML = questions.length; /* Zeigt an wie viele Fragen es gibt */

    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        showNextQuestion();
    }
}

function answer(answer) {
    if (pressRightAnswer(answer)) {
        updateColorAndScore(answer);
        audio_good.play();
    } else { /* Wenn die antwort falsch war passiert das... */
        showBothColors(answer);
        audio_wrong.play();
    }
    enableButton();
    removeOnClickAndHover();
}

function nextQuestion() {
    currentQuestion++; /* von 0 auf 1 usw... */
    resetColors();
    disableButton();
    updateCurrentQuestion();
    showQuestion(); /* Um die neue Frage zu laden */

    if (notTheEnd()) {
        addOnClickAndHover();
    }
}

function nextGame() {
    resetAll();
    showQuestion(); /* Zeigt die erste frage wieder an */
}


/* Hilfsfunktionen */

function resetColors() {
    for (let i = 1; i <= 4; i++) { /* Damit er das 4 mal ausführt*/
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-success');
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-danger'); /* Damit die Farben wieder weg gehen */
    }
}

function removeAllAnswerClasses() {
    answer_1.parentNode.classList.remove("quiz-answer-card", "mb-2", "card");
    answer_2.parentNode.classList.remove("quiz-answer-card", "mb-2", "card");
    answer_3.parentNode.classList.remove("quiz-answer-card", "mb-2", "card");
    answer_4.parentNode.classList.remove("quiz-answer-card", "mb-2", "card");
}

function addAllAnswerClasses() {
    answer_1.parentNode.classList.add("quiz-answer-card", "mb-2", "card");
    answer_2.parentNode.classList.add("quiz-answer-card", "mb-2", "card");
    answer_3.parentNode.classList.add("quiz-answer-card", "mb-2", "card");
    answer_4.parentNode.classList.add("quiz-answer-card", "mb-2", "card");
}

function calcPercent() {
    let percentcomma = (currentQuestion + 1) / questions.length;
    let percent = percentcomma * 100;
    return percent;
}



function removeOnClickAndHover() {
    for (let i = 1; i <= 4; i++) { /* Damit er das 4 mal ausführt*/
        document.getElementById(`answer_${i}`).parentNode.removeAttribute('onclick'); /* löscht das onclick */
        document.getElementById(`answer_${i}`).parentNode.classList.remove('quiz-answer-card'); /* löscht den hover effekt */
    }
}

function addOnClickAndHover() { /* TODO funktuniert noch nicht, er fügt das onclick nicht wieder ein */
    for (let i = 1; i <= 4; i++) { /* Damit er das 4 mal ausführt*/
        document.getElementById(`answer_${i}`).parentNode.setAttribute('onclick', `answer('answer_${i}')`);
        document.getElementById(`answer_${i}`).parentNode.classList.add('quiz-answer-card');
    }
}

function showEndScreen() {
    /* Show endscreen */
    question_titel.innerHTML = 'Ende!'
    answer_1.innerHTML = '';
    answer_2.innerHTML = 'Du hast es bis zum Ende geschafft!';
    answer_3.innerHTML = `Du hast <b>${score}</b> von <b>${questions.length}</b> Fragen richtig beantwortet!`;
    answer_4.innerHTML = '';

    removeAllAnswerClasses();
    document.getElementById('next-button').parentNode.style.display = 'none'; /* löscht den ganzen unteren bereich wo der Button ist */
    document.getElementById('questionFooter2').style = ''; /* fügt den button "neues spiel" ein */
    document.getElementById('img').src = "medal.png"; /* ändert das bild im endscreen */
    document.getElementById('progress-bar').parentNode.classList.add("hide"); /* lässt die progressbar verschwinden */
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function updateProgressBar() {
    document.getElementById('progress-bar').innerHTML = `${calcPercent()}%`;
    document.getElementById('progress-bar').style.width = `${calcPercent()}%`;
}

function showNextQuestion() {
    let question = questions[currentQuestion]; /* für die bessere Lesbarkeit, Damit die nachfolgende schreibweise leichter wird */

    let question_titel = document.getElementById('question_titel'); /* Für die bessere lesbarkeit der nachfolgenden */
    let answer_1 = document.getElementById('answer_1');
    let answer_2 = document.getElementById('answer_2');
    let answer_3 = document.getElementById('answer_3');
    let answer_4 = document.getElementById('answer_4');

    question_titel.innerHTML = question["question"]; /* fügt die aktuelle frage ein */
    answer_1.innerHTML = question["answer_1"];
    answer_2.innerHTML = question["answer_2"];
    answer_3.innerHTML = question["answer_3"];
    answer_4.innerHTML = question["answer_4"];
}

function pressRightAnswer(answer) {
    let question = questions[currentQuestion]; /* für die bessere Lesbarkeit, Damit die nachfolgende schreibweise leichter wird */
    let answerNumber = answer.slice(-1); /* Damit nimmt er die letzte zahl, also aus 'answer_3' wird '3' */

    return answerNumber == question["right_answer"];
}

function updateColorAndScore(answer) {
    document.getElementById(answer).parentNode.classList.add('bg-success'); /* Mit parentNode geht er auf das übergeordnete Element */
    score++;
}

function showBothColors(answer) {
    let question = questions[currentQuestion]; /* für die bessere Lesbarkeit, Damit die nachfolgende schreibweise leichter wird */
    let idOfRightAnswer = `answer_${question["right_answer"]}`; /* Könnte ich auch so reinschreiben, sieht aber so schöner aus */

    document.getElementById(answer).parentNode.classList.add('bg-danger');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
}

function enableButton() {
    document.getElementById('next-button').disabled = false; /* damit wird der Button enabled */
}

function disableButton() {
    document.getElementById('next-button').disabled = true; /* damit wird der Button wieder disabled */
}

function updateCurrentQuestion() {
    let current_question = document.getElementById('current-question');
    current_question.innerHTML = currentQuestion + 1; /* Damit zeigt er die Aktuelle frage an */
}

function notTheEnd() {
    return currentQuestion < questions.length;
}

function resetAll() {
    currentQuestion = 0; /* setzt den wert wieder auf den anfangswert */
    score = 0; /* setzt den wert wieder auf den anfangswert */
    document.getElementById('questionFooter2').style.display = 'none'; /* der end screen button verschwindet wieder */
    document.getElementById('img').src = "quiz.jpg"; /* ändert das bild wieder zurück */
    document.getElementById('progress-bar').parentNode.classList.remove("hide"); /* zeigt die progress bar wieder an */
    document.getElementById('next-button').parentNode.style = ''; /* Zeigt den unteren bereich wieder an */
    addAllAnswerClasses();
    let current_question = document.getElementById('current-question');
    current_question.innerHTML = currentQuestion + 1; /* Damit zeigt er die Aktuelle frage an */
    addOnClickAndHover();
}