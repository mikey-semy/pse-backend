document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.nav__icon').addEventListener('click', function() {
        document.querySelector('.nav').classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.app-header');
    const backToTop = document.getElementById('back-to-top');
    let lastScrollTop = 0;
    
    document.addEventListener('scroll', function() {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        console.log(scrollTop);
        // Скрытие/показ header
        if (scrollTop > lastScrollTop) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;

        // Показ/скрытие кнопки "наверх"
        if (scrollTop > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // Обработчик для кнопки "наверх"
    backToTop.addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});

document.getElementById('copyButton').addEventListener('click', function() {
    fetch('/static/scripts/bookmark.new.js')
        .then(response => response.text())
        .then(text => {
            navigator.clipboard.writeText(text)
                .then(() => alert('Код скопирован в буфер обмена'))
                .catch(err => console.error('Ошибка копирования: ', err));
        })
        .catch(error => console.error('Ошибка загрузки скрипта: ', error));
});

document.getElementById('search-button').addEventListener('click', performSearch);
document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchQuery = document.getElementById('search-input').value;
    fetch(`/search?q=${encodeURIComponent(searchQuery)}`)
        .then(response => response.json())
        .then(data => {
            const searchResults = document.getElementById('search-results');
            searchResults.innerHTML = '';

            if (data.length === 0) {
                // Если нет результатов, выводим сообщение
                const noResultsItem = document.createElement('li');
                noResultsItem.textContent = 'Вопрос не найден.';
                searchResults.appendChild(noResultsItem);
            } else {
                // Если есть результаты, выводим их
                data.forEach(result => {
                    const resultItem = document.createElement('li');
                    resultItem.innerHTML = `
                        <h3>${result.question_text}</h3>

                        ${result.question_type ? `
                        <p>Тип вопроса: ${result.question_type}</p>
                        ` : ''}
                        
                        ${result.answers ? `
                        <p>Ответы:</p>
                        <ul>
                        ${Array.isArray(result.answers) ? result.answers.map(answer => `<li>${answer}</li>`).join('') : `<li>${result.answers}</li>`}
                        </ul>
                        ` : ''}
                        
                        <p>Правильные ответы:</p>
                        <ul>
                            ${Array.isArray(result.correct_answers) ? result.correct_answers.map(answer => `<li>${answer}</li>`).join('') : `<li>${result.correct_answers}</li>`}
                        </ul>
                        
                    `;
                    searchResults.appendChild(resultItem);
                });
            }
        })
        .catch(error => console.error('Ошибка:', error));
}


    // document.addEventListener('DOMContentLoaded', function() {
    //     const backToTopButton = document.getElementById('back-to-top');
    //     console.log('Button found:', backToTopButton); // Проверяем, что кнопка найдена
    
    //     window.addEventListener('scroll', function() {
    //         console.log('Scroll position:', document.scrollY); // Проверяем значение scrollY
    //         if (window.scrollY > 300) {
    //             backToTopButton.style.display = 'flex';
    //             console.log('Button displayed'); // Проверяем, что кнопка отображается
    //         } else {
    //             backToTopButton.style.display = 'none';
    //             console.log('Button hidden'); // Проверяем, что кнопка скрыта
    //         }
    //     });
    
    //     backToTopButton.addEventListener('click', function() {
    //         window.scrollTo({top: 0, behavior: 'smooth'});
    //         console.log('Button clicked'); // Проверяем, что кнопка нажата
    //     });
    // });

        // Проверяем, было ли уведомление уже показано
        if (!localStorage.getItem('alertShown')) {
            document.getElementById('alert').style.display = 'block';
        }
    
        function closeAlert() {
            document.getElementById('alert').style.display = 'none';
            // Сохраняем информацию о том, что уведомление было показано
            localStorage.setItem('alertShown', 'true');
        }