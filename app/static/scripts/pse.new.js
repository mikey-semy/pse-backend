// Ссылка на API
const apiUrl = 'https://pse.aedb.ru/';

// Константы для идентификации элементов
const classNameQuestion_ = 'ant-typography.css-1y5hf77:not(.text-center)';
const classNameAnswers_ = 'answer';

// Объект с типами вопросов
const QuestionTypes = {
    TF: {
        questionHelpText: 'Выберите один правильный ответ и нажмите кнопку "Подтвердить"',
        hintsTitle: "Подсказка. Выберите один из вариантов:",
    },
    MC: {
        questionHelpText: 'Выберите один правильный ответ и нажмите кнопку "Подтвердить"',
        hintsTitle: "Подсказка. Выберите один из вариантов:",
    },
    MR: {
        questionHelpText: 'Выберите несколько правильных ответов и нажмите кнопку "Подтвердить"',
        hintsTitle: "Подсказка. Выберите несколько вариантов:",
    },
    SEQ: {
        questionHelpText: 'Упорядочите варианты в правильной последовательности и нажмите кнопку "Подтвердить"',
        hintsTitle: "Подсказка. Упорядочите варианты:",
    },
    NUMG: {
        questionHelpText: 'Введите правильный ответ и нажмите кнопку "Подтвердить"',
        hintsTitle: "Подсказка. Введите ответ:",
    },
};

// Функция для получения текста вопроса
function getQuestionText() {
    const questionElement = document.querySelector(`h4.${classNameQuestion_}`);
    return questionElement ? questionElement.textContent : null;
}

// Функция для получения текстов ответов
function getAnswers() {
    const answerElements = document.querySelectorAll(`.${classNameAnswers_} .ant-typography`);
    return Array.from(answerElements).map(el => el.textContent);
}

// Функция для получения правильных ответов
function getCorrectAnswers() {
    const selectedAnswerElement = document.querySelector('.answer-selected .ant-typography');
    return selectedAnswerElement ? [selectedAnswerElement.textContent] : [];
}

// Функция для получения типа вопроса
function getQuestionType() {
    const typeElement = document.querySelector('.ant-space-item .ant-typography');
    const typeText = typeElement ? typeElement.textContent : '';
    
    // Определяем тип вопроса на основе текста
    if (typeText.includes('один правильный ответ')) {
        return 'MC'; // Множественный выбор
    } else if (typeText.includes('несколько правильных ответов')) {
        return 'MR'; // Множественный выбор с несколькими ответами
    } else if (typeText.includes('упорядочите варианты')) {
        return 'SEQ'; // Упорядочивание
    } else if (typeText.includes('введите правильный ответ')) {
        return 'NUMG'; // Ввод числа
    } else {
        return 'TF'; // По умолчанию, если не найдено
    }
}

// Функция для отправки ответа по API
function sendAnswer(apiUrl = 'https://pse.aedb.ru/') {
    const questionText = getQuestionText();
    const answers = getAnswers();
    const correctAnswers = getCorrectAnswers();
    const questionType = getQuestionType();

    const apiUrlPost = apiUrl;

    const payload = {
        id: 0, // Формируется автоматически
        question_type: questionType,
        question_text: questionText || "Вопрос не найден",
        answers: answers,
        correct_answers: correctAnswers,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    fetch(apiUrlPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сети: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Ответ успешно отправлен!', data);
    })
    .catch(error => {
        console.error('Ошибка при отправке ответа:', error);
    });
}

// Функция для поиска вопроса на сервере
function searchQuestion(apiUrl = 'https://pse.aedb.ru/') {
    const questionText = getQuestionText();
    console.log('Ищем вопрос:', questionText);
    
    const apiUrlGet = apiUrl + 'search?q=' + encodeURIComponent(questionText);

    let response = {
        run: function (apiUrlGet) {
            let headers = {
                'accept': 'application/json',
            };

            fetch(apiUrlGet, {
                'method': 'GET',
                'mode': 'cors',
                'credentials': 'include',
                'cache': 'no-cache',
                'headers': headers
            })
            .then(response => this.check(response))
            .then(data => this.success(data))
            .catch(error => this.error(error));
        },

        check: function (response) {
            if (response.status !== 200) {
                console.log('Похоже, возникла проблема. Код состояния: ' + response.status);
                return;
            }
            return response.json();
        },

        success: function (data) {
            console.log('Данные получены!');
            handleServerResponse(data)
            console.log(data);
        },

        error: function (error) {
            console.log('Ошибка: ', error);
        }
    };
    response.run(apiUrlGet);
};

function handleServerResponse(data) {
    // Если ответы найдены
    if (data.length > 0) {
        // Если найден один ответ
        if (data.length == 1) {
            console.log(data[0].correct_answers)
            highlightCorrectAnswers(data[0].correct_answers);
        } else { 
            // Или несколько ответов
            console.log(data)
            showQuestions(data)
        }
    } else {
        // Или ответ не найден
        showMessageQuestionNotFound();
        //sendAnswer(apiUrl)
    }
}
// Функция для отображения сообщения, если ответ не найден
function showMessageQuestionNotFound() {
    const message = document.createElement('div');
    message.className = 'notification';
    message.innerHTML = `
        <div class="notification-content">
            <h4>Ответ не найден!</h4>
            <p>Пожалуйста, добавьте новый ответ.</p>
        </div>
    `;
    document.body.appendChild(message);

    // Удаляем уведомление через 5 секунд
    setTimeout(() => {
        message.remove();
    }, 5000);

    // Стили для уведомления
    addNotificationStyle();
}

// Функция для отображения найденных вопросов
function showQuestions(questions) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h4>Найдены несколько ответов:</h4>
            <div class="questions-list">
                ${questions.map(q => `
                    <div class="question-item">
                        <strong>${q.question_text}</strong>
                        <p><em>Правильные ответы:</em></p>
                        <ul>
                            ${q.correct_answers.map(answer => `<li>${answer}</li>`).join('')}
                        </ul>
                        ${q.answers.length > 0 ? `
                        <p><em>Все варианты ответов:</em></p>
                        <ul>
                            ${q.answers.map(answer => `<li>${answer}</li>`).join('')}
                        </ul>` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(notification);

    // Удаляем уведомление через 10 секунд
    setTimeout(() => {
        notification.remove();
    }, 10000);

    // Стили для уведомления
    addNotificationStyle();
}


// Функция для выделения правильных ответов
function highlightCorrectAnswers(correctAnswers) {
    const answerElements = document.querySelectorAll(`.${classNameAnswers_}`);
    
    answerElements.forEach((el) => {
        const answerText = el.textContent.trim();
        if (correctAnswers.includes(answerText)) {
            console.log("Найден правильный ответ: " + answerText);
            el.classList.add('correct-answer');
        }
    });
}

// Функция для добавления стилей уведомления
function addNotificationStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            padding: 15px;
            width: 300px;
            max-height: 80vh;
            overflow-y: auto;
        }
        .notification-content {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        .notification h4 {
            margin: 0 0 10px;
        }
        .questions-list {
            width: 100%;
        }
        .question-item {
            margin-bottom: 10px;
        }
        .question-item strong {
            display: block;
            margin-bottom: 5px;
        }
    `;
    document.head.appendChild(style);
}

// Функция для добавления стилей правильных ответов
function addCorrectAnswerStyle() {
    const style = document.createElement('style');
    style.textContent = `
      .correct-answer {
        border: 2px solid #52c41a !important;
        background-color: #f6ffed !important;
        box-shadow: 0 0 5px rgba(82, 196, 26, 0.5);
      }
  
      .correct-answer .anticon-border {
        color: #52c41a;
      }
  
      .correct-answer .ant-typography {
        color: #135200;
      }
    `;
    document.head.appendChild(style);
  }
  

addCorrectAnswerStyle();

searchQuestion();