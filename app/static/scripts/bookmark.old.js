javascript: (() => {
    const addRemoteScript = (
        
        src = 'https://storage.yandexcloud.net/aepp.ru/pse/requestScript.js') => {
            
            const head = document.head || document.getElementsByTagName('head')[0];
            
            const remoteScript = document.createElement('script'); remoteScript.src = src;
            
            const isElement = (tag, attribute, value) => {
                
                let existingElements = [];
                
                let elements = document.getElementsByTagName(tag);
                
                for (let element of elements) 
                    
                    existingElements.push(element.getAttribute(attribute));
                
                return (existingElements.includes(value));
            }; 
                
                if (!isElement('script', 'src', src)) 
                    
                    head.appendChild(remoteScript);
                
                remoteScript.onload = () => { 
                    
                    getCorrectAnswerLS();
                    
                    document.addEventListener('keydown', (event) => { 
                        switch (event.code) {
                            case 'KeyA': 
                                getCorrectAnswerLS(); 
                                break;
                            case 'KeyO': 
                                getFromServer(fileOldAnswers); 
                                break;
                            case 'KeyN': 
                                getFromServer(fileNewAnswers); 
                                break;
                        };
                    });
                };
            };
            addRemoteScript();
        })();