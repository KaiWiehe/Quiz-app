let questions = [{
        "question": "Leonard und Penny küssen sich nach ihrem ersten Date im Flur: Was bemerkt Leonard an der Decke?",
        "answer_1": "Eine Überwachungskamera",
        "answer_2": "Sheldon hat eine Notiz aufgehängt",
        "answer_3": "es hängt ein Mistelzweig über der Tür und deswegen küssen sie sich",
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
        "answer_1": "Lennard & Penny",
        "answer_2": "Raj & Burnadette",
        "answer_3": "Sheldon & Amy",
        "answer_4": "Howert & Burnadette",
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
        "answer_4": "Old Mcdonald had a farm",
        "right_answer": 1
    },
    {
        "question": "Wo im Appartement von Leonard und Sheldon befindet sich eine Kamera?",
        "answer_1": "In der Deckenlampe",
        "answer_2": "In der Aquamen Figur",
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

let currentQuestion = 0;

function init() {
    let question_lenght = document.getElementById('question_lenght');
    question_lenght.innerHTML = questions.length;

    showQuestion();
}

function showQuestion() {
    let question = questions[currentQuestion];
    let question_titel = document.getElementById('question_titel');
    let answer_1 = document.getElementById('answer_1');
    let answer_2 = document.getElementById('answer_2');
    let answer_3 = document.getElementById('answer_3');
    let answer_4 = document.getElementById('answer_4');

    question_titel.innerHTML = `${question["question"]}`;
    answer_1.innerHTML = `${question["answer_1"]}`;
    answer_2.innerHTML = `${question["answer_2"]}`;
    answer_3.innerHTML = `${question["answer_3"]}`;
    answer_4.innerHTML = `${question["answer_4"]}`;
}