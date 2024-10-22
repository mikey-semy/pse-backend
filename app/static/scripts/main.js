document.addEventListener('DOMContentLoaded', function() {
    // Переменные для элементов
    const header = document.querySelector('.app-header');
    const backToTop = document.getElementById('back-to-top');
    const copyButton = document.getElementById('copyButton');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const alertBox = document.getElementById('alert');
    const countDisplay = document.getElementById('count');

    // Проверка наличия элементов
    if (header && backToTop && copyButton && searchButton && searchInput && searchResults && alertBox && countDisplay) {
        let lastScrollTop = 0;

        // Обработчик для навигационного меню
        document.querySelector('.nav__icon').addEventListener('click', function() {
            document.querySelector('.nav').classList.toggle('active');
        });

        // Обработчик прокрутки
        document.addEventListener('scroll', function() {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;

            // Скрытие/показ header
            header.style.transform = scrollTop > lastScrollTop ? 'translateY(-100%)' : 'translateY(0)';
            lastScrollTop = scrollTop;

            // Показ/скрытие кнопки "наверх"
            backToTop.style.display = scrollTop > 300 ? 'flex' : 'none';
        });

        // Обработчик для кнопки "наверх"
        backToTop.addEventListener('click', function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });

        // Обработчик для кнопки копирования
        copyButton.addEventListener('click', function() {
            fetch('/static/scripts/bookmark.new.js')
                .then(response => response.text())
                .then(text => {
                    navigator.clipboard.writeText(text)
                        .then(() => alert('Код скопирован в буфер обмена'))
                        .catch(err => console.error('Ошибка копирования: ', err));
                })
                .catch(error => console.error('Ошибка загрузки скрипта: ', error));
        });

        // Обработчики для поиска
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        function performSearch() {
            const searchQuery = searchInput.value;
            fetch(`/search?q=${encodeURIComponent(searchQuery)}`)
                .then(response => response.json())
                .then(data => {
                    searchResults.innerHTML = '';

                    if (data.length === 0) {
                        const noResultsItem = document.createElement('li');
                        noResultsItem.textContent = 'Вопрос не найден.';
                        searchResults.appendChild(noResultsItem);
                    } else {
                        data.forEach(result => {
                            const resultItem = document.createElement('li');
                            resultItem.innerHTML = `
                                <h3>${result.question_text}</h3>
                                ${result.question_type ? `<p>Тип вопроса: ${result.question_type}</p>` : ''}
                                ${result.answers ? `<p>Ответы:</p><ul>${Array.isArray(result.answers) ? result.answers.map(answer => `<li>${answer}</li>`).join('') : `<li>${result.answers}</li>`}</ul>` : ''}
                                <p>Правильные ответы:</p>
                                <ul>${Array.isArray(result.correct_answers) ? result.correct_answers.map(answer => `<li>${answer}</li>`).join('') : `<li>${result.correct_answers}</li>`}</ul>
                            `;
                            searchResults.appendChild(resultItem);
                        });
                    }
                })
                .catch(error => console.error('Ошибка:', error));
       
        }
    }

});