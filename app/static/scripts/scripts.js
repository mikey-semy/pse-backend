const bookmarkletCode = `javascript:(()=>{document.head.appendChild(document.createElement('script')).src='https://storage.yandexcloud.net/aepp.ru/pse/pse.new.js'})();`;
    
document.getElementById('copyBookmarklet').addEventListener('click', function() {
    navigator.clipboard.writeText(bookmarkletCode).then(() => {
        alert('Bookmarklet code copied to clipboard!');
    });
});

document.getElementById('createBookmark').addEventListener('click', function() {
    if (window.sidebar && window.sidebar.addPanel) { // Firefox
        window.sidebar.addPanel('PSE Bookmarklet', bookmarkletCode, '');
    } else if (window.external && ('AddFavorite' in window.external)) { // IE
        window.external.AddFavorite(bookmarkletCode, 'PSE Bookmarklet');
    } else { // Chrome, Safari, etc.
        alert('Please press ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D to bookmark this page.');
    }
});