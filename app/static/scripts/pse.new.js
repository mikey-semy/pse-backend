// Константы для идентификации элементов
const classNameQuestion_ = 'ant-typography.css-1y5hf77:not(.text-center)';
const classNameAnswers_ = 'answer';

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

// Функция для поиска вопроса на сервере
function searchQuestion() {
    let response = {
        run: function (url_) {
            let headers = {
                'accept': 'application/json',
            };

            fetch(url_, {
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

    const questionText = getQuestionText();
    console.log(questionText);
    const url_ = 'https://pse.aedb.ru/search?q=' + encodeURIComponent(questionText);
    console.log(url_);
    response.run(url_);
};

function handleServerResponse(data) {
    if (data.length > 0) {
        if (data.length == 1) {
            console.log(data[0].correct_answers)
            highlightCorrectAnswers(data[0].correct_answers);
        } else {
            console.log(data)
            //showQuestions(data)
        }
    } else {
        
        //showMessageQuestionNotFound();
        //sendDataToServer();
    }
}


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
  

addCorrectAnswerStyle();

searchQuestion();