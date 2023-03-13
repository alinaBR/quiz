const questions = [
    {
        question: "Какой язык работает в браузере?",
        answers: ["Java", "C", "Python", "Javascript"],
        correct: 4,
    },
    {
        question: "Что ознаечает css?",
        answers:
            ["Central Style Sheets",
                "Cascading Style Sheets",
                "Cascading Simple Sheets",
                "Cars SUVs Sailboats",
            ],
        correct: 2,
    },
    {
        question: "Что ознаечает HTML?",
        answers: [
            "Hypertext Markup Language",
            "Hypertext Markup Down",
            "Hyperloop Machine Language",
            "Hypertext Machine Down",
        ],
        correct: 1,
    },
    {
        question: "В каком году был создан JavaScript?",
        answers: ["1996", "1995", "1994", "все ответы неверные"],
        correct: 2,
    },
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');


let score = 0;
let questionIndex = 0;

headerContainer.innerHTML = '';
listContainer.innerHTML = '';


clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showQuestion() {
    //вопрос
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
    headerContainer.innerHTML = title;


    // варианты ответов
    let answerNumber = 1;
    for (answerText of questions[questionIndex]['answers']) {
        console.log(answerNumber, answerText);
        const questionTemplate =
            `<li>
        <label>
            <input value="%number%" type="radio" class="answer" name="answer" />
            <span>%answer%</span>
        </label>
    </li>
 `;
        const answerHTML = questionTemplate
            .replace('%answer%', answerText)
            .replace('%number%', answerNumber)

        listContainer.innerHTML += answerHTML;
        answerNumber++;
    }
}
function checkAnswer() {
    console.log('checkAnswer started');

    //находим выбранную радиокнопку
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')



    //если ответ был выбран -ничего не делаем , выходим из функции
    if (!checkedRadio) {
        submitBtn.blur();
        return
    }


    //узнаем номер пользователя
    const userAnswer = parseInt(checkedRadio.value)
    if (userAnswer === questions[questionIndex]['correct']) {
        score++;
    }
    console.log('score = ', score);


    if (questionIndex !== questions.length - 1) {
        console.log('это не последний вопрос')
        questionIndex++;
        clearPage();
        showQuestion();
        return;
    } else {
        console.log('это  последний вопрос');
        clearPage();
        showResults();
    }
}

function showResults() {
    console.log('showResults started');
    console.log(score);

    const resultsTemplate = `
            <h2 class="title">%title%</h2>
            <h3 class="summary">%message%</h3>
            <p class="result">%result%</p>
    `;
    let title, message;
    //варианты заголовков и текста
    if (score === questions.length) {
        title = 'Поздравляем!';
        message = 'Вы ответили верно на все вопросы';
    } else if ((score * 100) / questions.length >= 50) {
        title = 'Неплохой результат!';
        message = 'Вы дали более половины правильных ответов';
    } else {
        title = 'Стоит постараться';
        message = 'Пока у вас меньше половины правильных ответов';
    }
    //результат
    let result = `${score} из ${questions.length}`;

    // финальный результат, подставляем данные в шаблон 

    const finalMessage = resultsTemplate
        .replace('%title%', title)
        .replace('%summary%', message)
        .replace('%result%', result)

    headerContainer.innerHTML = finalMessage;


    submitBtn.blur();
    submitBtn.innerHTML = 'Начать заново';
    submitBtn.onclick = () => {
        history.go();
    };
}
