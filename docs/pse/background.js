chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      const addRemoteScript = (src = 'https://pse.aedb.ru/static/scripts/pse.new.js') => {
        const head = document.head || document.getElementsByTagName('head')[0];
        const remoteScript = document.createElement('script');
        remoteScript.src = src;
        const isElement = (tag, attribute, value) => {
          let existingElements = [];
          let elements = document.getElementsByTagName(tag);
          for (let element of elements) {
            existingElements.push(element.getAttribute(attribute));
          }
          return existingElements.includes(value);
        };
        if (!isElement('script', 'src', src)) {
          head.appendChild(remoteScript);
        }
        remoteScript.onload = () => {
          document.addEventListener('keydown', (event) => {
            switch (event.code) {
              case 'KeyS': searchQuestion(); break;
              case 'KeyA': sendAnswer(); break;
              case 'KeyD': updateAnswer(); break;
            }
          });
        };
      };
      addRemoteScript();
    }
  });
});
