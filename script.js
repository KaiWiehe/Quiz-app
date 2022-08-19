let filterCategory = [];
let score = 0; /* der punktestand startet bei 0 und wird bei jeder richtigen antwort um 1 erhöht */
let currentQuestion = 0; /* Der anfangswert, damit er bei dem ersten json array inhalt anfängt */
let audio_good = new Audio('sounds/good.mp3'); /* audio "Richtige Frage" */
let audio_wrong = new Audio('sounds/wrong.mp3'); /* audio "Falsche Frage" */
let audio_winner = new Audio('sounds/winner.mp3'); /* audio "Ende" */

function initQuestion(questionCategory) {
    changeContainer();
    let category = questions.filter(questions => questions.category === questionCategory); /* packt alle fragen mit der 'questionCategory' aus dem Parameter in ein neues Array */
    filterCategory.push(category);
    showAmmountOfQuestions();
    showQuestion();
    document.getElementById('question-container').style = `background: linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8)), url("${filterCategory[0][currentQuestion]['background']}");background-position: center;background-repeat: no-repeat;background-size: 100% 100%;`;
}

function changeCategory(questionCategory) {
    nextGame();
    initQuestion(questionCategory);
}

function showQuestion() {
    if (filterCategory.length == 1) {
        if (gameIsOver()) {
            showEndScreen();
            audio_winner.play();
        } else {
            /* updateProgressBar(); */
            showNextQuestion();
        }
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
    resetColors();
    showQuestion(); /* Zeigt die erste frage wieder an */
}


/* Hilfsfunktionen */

function resetColors() {
    for (let i = 1; i <= 4; i++) { /* Damit er das 4 mal ausführt*/
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-success');
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-wrong'); /* Damit die Farben wieder weg gehen */
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
    let percentcomma = (currentQuestion + 1) / filterCategory[0].length;
    let percent = Math.round(percentcomma * 100); /* Damit er nur ganze zahlen ausgibt */
    return percent;
}



function removeOnClickAndHover() {
    for (let i = 1; i <= 4; i++) { /* Damit er das 4 mal ausführt*/
        document.getElementById(`answer_${i}`).parentNode.removeAttribute('onclick'); /* löscht das onclick */
        document.getElementById(`answer_${i}`).parentNode.classList.remove('question-hover'); /* löscht den hover effekt */
    }
}

function addOnClickAndHover() { /* TODO funktuniert noch nicht, er fügt das onclick nicht wieder ein */
    for (let i = 1; i <= 4; i++) { /* Damit er das 4 mal ausführt*/
        document.getElementById(`answer_${i}`).parentNode.setAttribute('onclick', `answer('answer_${i}')`);
        document.getElementById(`answer_${i}`).parentNode.classList.add('question-hover');
    }
}

function showEndScreen() {
    question_titel.innerHTML = ''
    answer_1.innerHTML = '';
    answer_2.innerHTML = '<b class="end">Ende!</b>';
    answer_3.innerHTML = 'Du hast es bis zum Ende geschafft!';
    answer_4.innerHTML = `Du hast <b>${score}</b> von <b>${filterCategory[0].length}</b> Fragen richtig beantwortet!`;

    removeAllAnswerClasses();
    document.getElementById('questionFooter').style.display = 'none'; /* löscht den ganzen unteren bereich wo der Button ist */
    document.getElementById('questionFooter2').style = ''; /* fügt den button "neues spiel" ein */
    /* document.getElementById('img').src = "img/medal.png"; */
    /* ändert das bild im endscreen */
    /* document.getElementById('progress-bar').parentNode.classList.add("hide"); */
    /* lässt die progressbar verschwinden */
}

function gameIsOver() {
    return currentQuestion >= filterCategory[0].length;
}

function updateProgressBar() {
    document.getElementById('progress-bar').innerHTML = `${calcPercent()}%`;
    document.getElementById('progress-bar').style.width = `${calcPercent()}%`;
}

function showNextQuestion() {
    let question = filterCategory[0][currentQuestion]; /* für die bessere Lesbarkeit, Damit die nachfolgende schreibweise leichter wird */

    document.getElementById('question_titel').innerHTML = question["question"]; /* fügt die aktuelle frage ein */
    document.getElementById('answer_1').innerHTML = question["answer_1"];
    document.getElementById('answer_2').innerHTML = question["answer_2"];
    document.getElementById('answer_3').innerHTML = question["answer_3"];
    document.getElementById('answer_4').innerHTML = question["answer_4"];
}

function pressRightAnswer(answer) {
    let question = filterCategory[0][currentQuestion]; /* für die bessere Lesbarkeit, Damit die nachfolgende schreibweise leichter wird */
    let answerNumber = answer.slice(-1); /* Damit nimmt er die letzte zahl, also aus 'answer_3' wird '3' */

    return answerNumber == question["right_answer"];
}

function updateColorAndScore(answer) {
    document.getElementById(answer).parentNode.classList.add('bg-success'); /* Mit parentNode geht er auf das übergeordnete Element */
    score++;
}

function showBothColors(answer) {
    let question = filterCategory[0][currentQuestion]; /* für die bessere Lesbarkeit, Damit die nachfolgende schreibweise leichter wird */
    let idOfRightAnswer = `answer_${question["right_answer"]}`; /* Könnte ich auch so reinschreiben, sieht aber so schöner aus */

    document.getElementById(answer).parentNode.classList.add('bg-wrong');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
}

function enableButton() {
    document.getElementById('next-button').disabled = false; /* damit wird der Button enabled */
    document.getElementById('next-button').classList.remove('disabled'); /* löscht das disabled design */
    document.getElementById('next-button').classList.add('button-hover'); /* fügt den hover effekt hinzu */
}

function disableButton() {
    document.getElementById('next-button').disabled = true; /* damit wird der Button wieder disabled */
    document.getElementById('next-button').classList.add('disabled'); /* löscht das disabled design */
    document.getElementById('next-button').classList.remove('button-hover'); /* fügt den hover effekt hinzu */
}

function updateCurrentQuestion() {
    let current_question = document.getElementById('current-question');
    current_question.innerHTML = currentQuestion + 1; /* Damit zeigt er die Aktuelle frage an */
}

function notTheEnd() {
    return currentQuestion < filterCategory[0].length;
}

function resetAll() {
    filterCategory = [];
    currentQuestion = 0; /* setzt den wert wieder auf den anfangswert */
    score = 0; /* setzt den wert wieder auf den anfangswert */
    document.getElementById('questionFooter2').style.display = 'none'; /* der end screen button verschwindet wieder */
    /* document.getElementById('img').src = "img/quiz.jpg"; */
    /* ändert das bild wieder zurück */
    /* document.getElementById('progress-bar').parentNode.classList.remove("hide"); */
    /* zeigt die progress bar wieder an */
    document.getElementById('questionFooter').style = ''; /* Zeigt den unteren bereich wieder an */
    addAllAnswerClasses();
    let current_question = document.getElementById('current-question');
    current_question.innerHTML = currentQuestion + 1; /* Damit zeigt er die Aktuelle frage an */
    addOnClickAndHover();
    document.getElementById('question-container').classList.add('hide'); /* Zeigt den fragebogen an */
    document.getElementById('category-container').classList.remove('hide'); /* Lässt den kategorie Container verschwinden */
}

function changeContainer() {
    document.getElementById('question-container').classList.remove('hide'); /* Zeigt den fragebogen an */
    document.getElementById('category-container').classList.add('hide'); /* Lässt den kategorie Container verschwinden */
}

function showAmmountOfQuestions() {
    let question_lenght = document.getElementById('question_lenght');
    question_lenght.innerHTML = filterCategory[0].length; /* Zeigt an wie viele Fragen es gibt */
}
/* 
function closeMenu() {
    document.getElementById('toggle_button').checked = false;
} */


/* ------------------------ */

var UD_MENU_OPEN = false;

function buttonAktive() {
    if (UD_MENU_OPEN === false) {
        UD_MENU_OPEN = true;
        document.getElementById("ud_menu_icon").classList.add("is-active");
        document.getElementById('left').style = "position: absolute;display: block;";
        document.getElementById('left').classList.remove('menuAnimationClose');
        document.getElementById('left').classList.add('menuAnimationOpen');
    } else {
        UD_MENU_OPEN = false;
        document.getElementById("ud_menu_icon").classList.remove("is-active");
        document.getElementById('left').classList.remove('menuAnimationOpen');
        document.getElementById('left').classList.add('menuAnimationClose');
        setTimeout(function() {
            document.getElementById('left').style = "";
        }, 490);
    }
}

function closeMenu() {
    UD_MENU_OPEN = false
    document.getElementById("ud_menu_icon").classList.remove("is-active");
    document.getElementById('left').classList.remove('menuAnimationOpen');
    document.getElementById('left').classList.add('menuAnimationClose');
    setTimeout(function() {
        document.getElementById('left').style = "";
    }, 490);
}

/* ------------------------ */