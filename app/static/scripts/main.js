document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.nav__icon').addEventListener('click', function() {
        document.querySelector('.nav').classList.toggle('active');
    });
});

let lastScrollTop = 0;
const header = document.getElementById('header');

document.addEventListener('scroll', () => {
    let scrollTop = window.pageY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.classList.add('app-header--hidden');
    } else {
        header.classList.remove('app-header--hidden');
    }
    lastScrollTop = scrollTop;
});

const backToTopButton = document.getElementById("back-to-top");

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "flex";
    } else {
        backToTopButton.style.display = "none";
    }
};

backToTopButton.onclick = function() {
    document.body.scrollTop = 0; // Для Safari
    document.documentElement.scrollTop = 0; // Для Chrome, Firefox, IE и Opera
};