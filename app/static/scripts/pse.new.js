// Ссылка на API
const apiUrl = 'https://pse.aedb.online/';

// Константы для идентификации элементов
const classNameQuestionType_ = 'ant-typography.css-1y5hf77:not(.text-center)';
const classNameQuestion_ = 'ant-typography.css-1y5hf77:not(.text-center)';
const classNameAnswers_ = 'answer';
const classNameCorrectAnswers_ = 'answer-selected';

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
    const selectedAnswerElements = document.querySelectorAll(`.${classNameCorrectAnswers_} .ant-typography`);
    return Array.from(selectedAnswerElements).map(el => el.textContent); // Возвращаем текст без изменений
}

// Функция для получения типа вопроса
function getQuestionType() {
    const typeElement = document.querySelector(`div.${classNameQuestionType_}`);
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
function sendAnswer(apiUrl = 'https://pse.aedb.online/') {
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
        created_at: new Date().toISOString(),   // Формируется автоматически
        updated_at: new Date().toISOString()    // Формируется автоматически
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
            return response.json().then(err => {
                throw new Error(err.detail || 'Ошибка при добавлении вопроса');
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Ответ успешно отправлен!', data);
        showNotification('message', 'Ответ успешно отправлен!', '');
    })
    .catch(error => {
        console.error('Ошибка при отправке ответа:', error);
        showNotification('error', 'Ошибка при отправке ответа!', error.message);
    });
}

// Функция для обновления ответа по API
function updateAnswer(apiUrl = 'https://pse.aedb.online/') {
    const questionType = getQuestionType();
    const questionText = getQuestionText();
    const answers = getAnswers();
    const correctAnswers = getCorrectAnswers();
    
    const apiUrlPut = apiUrl + 'question?q=' + encodeURIComponent(questionText);

    const payload = {
        id: 0, // Формируется автоматически
        question_type: questionType,
        question_text: questionText || "Вопрос не найден",
        answers: answers,
        correct_answers: correctAnswers,
        created_at: new Date().toISOString(),   // Формируется автоматически
        updated_at: new Date().toISOString()    // Формируется автоматически
    };

    fetch(apiUrlPut, {
        method: 'PUT',
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
        console.log('Ответ успешно обновлен!', data);
        showNotification('message', 'Ответ успешно обновлен!', '');
    })
    .catch(error => {
        console.error('Ошибка при обновлении ответа:', error);
        showNotification('error', 'Ошибка при обновлении ответа', error.message);
    });
}

// Функция для поиска вопроса на сервере
function searchQuestion(apiUrl = 'https://pse.aedb.online/') {
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
            showNotification('error', 'Ошибка', error.message);
        }
    };
    if (questionText) {
        response.run(apiUrlGet);
    } else {
        showNotification('error', 'Не та страница для поиска вопроса!', 'Но работоспособность проверена.');
    }
};

function handleServerResponse(data) {
    // Если вопросы найдены
    if (data.length > 0) {
        // Если найден один вопрос
        if (data.length == 1) {
            // Имеются ли ответы
            if (data.answers) {
                    // Имеются ли правильные ответы
                    if (data.correct_answers) {
                        highlightCorrectAnswers(data[0].correct_answers);
                    } else {
                        showNotification('error', 'Правильные ответы не найдены!', 'Пожалуйста, выберите правильный ответ и обновите.');
                    }
            } else {
                showNotification('error', 'Ответы не найдены!', 'Пожалуйста, выберите правильный ответ и обновите.');
            }
        } else { // Или несколько ответов
            highlightCorrectAnswers(data[0].correct_answers);
            showNotification('error', 'Несколько вариантов ответов!', 'Выбран первый...');
            // showNotification('questions', 'Найдены несколько ответов:', data, 20000);
            // updateAnswer()
        }
    } else {  // Или ответ не найден
        showNotification('error', 'Вопрос не найден!', 'Пожалуйста, добавьте новый вопрос с выбраными ответами.');
        // addAnswer()
    }
}

function showNotification(type, title, message, duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`; // Добавляем класс типа уведомления
    notification.innerHTML = `
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(notification);

    const closeTimeout = setTimeout(() => {
        notification.remove();
    }, duration);

    notification.addEventListener('click', () => {
        clearTimeout(closeTimeout);
        notification.remove();
    });

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
        .notification.error {
            border-color: #f5c6cb;
            background-color: #f8d7da;
            color: #721c24;
        }

        .notification.warning {
            border-color: #ffeeba;
            background-color: #fff3cd;
            color: #856404;
        }

        .notification.message {
            border-color: #bee5eb;
            background-color: #d1ecf1;
            color: #0c5460;
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
  
// Подключение стилей
addCorrectAnswerStyle(); 
addNotificationStyle();

// Поиск вопроса при нажатии клавиши или нажатии на закладку
searchQuestion();