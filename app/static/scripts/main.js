document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.nav__icon').addEventListener('click', function() {
        document.querySelector('.nav').classList.toggle('active');
    });
});