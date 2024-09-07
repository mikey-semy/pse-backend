const bookmarkletCode = `javascript:(()=>{document.head.appendChild(document.createElement('script')).src='https://storage.yandexcloud.net/aepp.ru/pse/pse.new.js'})();`;
    
document.getElementById('copyBookmarklet').addEventListener('click', function() {
    navigator.clipboard.writeText(bookmarkletCode).then(() => {
        alert('Bookmarklet code copied to clipboard!');
    });
});