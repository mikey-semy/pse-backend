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
