// Константы для идентификации элементов
const classNameQuestion = 'ant-typography';
const classNameAnswers = 'answer';

// Функция для получения текста вопроса
function getQuestionText() {
    const questionElement = document.querySelector(`h4.${classNameQuestion}`);
    return questionElement ? questionElement.textContent : null;
}

// Функция для получения текстов ответов
function getAnswers() {
    const answerElements = document.querySelectorAll(`.${classNameAnswers} .ant-typography`);
    return Array.from(answerElements).map(el => el.textContent);
}

// Функция для отправки данных на сервер
function sendDataToServer() {
    const questionText = getQuestionText();
    const answers = getAnswers();

    const data = {
        question: questionText,
        answers: answers
    };

    fetch('/api/question', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        // Обработка ответа сервера
        highlightCorrectAnswers(data.correctAnswers);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Функция для подсветки правильных ответов
function highlightCorrectAnswers(correctAnswers) {
    const answerElements = document.querySelectorAll(`.${classNameAnswers}`);
    answerElements.forEach((el, index) => {
        if (correctAnswers.includes(index)) {
            el.classList.add('correct-answer');
        }
    });
}

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
  
// Call this function when the page loads or before highlighting answers
addCorrectAnswerStyle();
// Вызов функции отправки данных
sendDataToServer();