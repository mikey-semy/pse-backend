### Подсказки для предсменного экзаменатора.

Проблема состоит в том, что перед началом смены каждый рабочий день приходиться тратить более получаса на предсменный экзаменатор.

Данная программа дает следующую возможность:
* Показывает правильный ответ, тем самым экономит твое время
* Накапливает базу правильных ответов на удаленном сервере

Да, это программа не сделает тебя умнее, но и тест этого не делает. 
Решая тест, ты учишься решать тест, а не тому о чем эти тесты.

Для использования программы необходимо сделать следующие шаги:
1. Скопировать код из [initScript](https://github.com/MikhailTo/work-test/blob/main/scripts/initScript.js):

```
javascript: (() => {
	const addRemoteScript = (src = 'https://pse.website.yandexcloud.net/scripts/requestScript.js') => {
					const head = document.head || document.getElementsByTagName('head')[0];	
					const remoteScript = document.createElement('script'); remoteScript.src = src;
					const isElement = (tag, attribute, value) => {
						let existingElements = [];
						let elements = document.getElementsByTagName(tag);
						for (let element of elements) existingElements.push(element.getAttribute(attribute));
						return (existingElements.includes(value));
					}; 
					if (!isElement('script', 'src', src)) 
						head.appendChild(remoteScript);
					remoteScript.onload = () => { 
						getCorrectAnswerLS();
						document.addEventListener('keydown', (event) => { 
							switch (event.code) {
								case 'KeyQ': setManualCorrectAnswer(saveAnswers()); break;
								case 'KeyO': getFromServer(fileOldAnswers); break;
								case 'KeyN': getFromServer(fileNewAnswers); break;
							};
						});
					};	
				};
				addRemoteScript();
			})();
				
		

```

2. Создать новую закладку "Новой вкладки".
3. Нажать на закладку правой кнопкой мыши.
4. В контекстном меню выбрать Изменить.
5. Вместо URL вставить скопированный код.
6. Название - любое или полностью удалить.
7. Во время ответа на вопрос необходимо нажать данную закладку.
8. Если ответ не был найден, необходимо самому выбрать правильный ответ и сохранить, нажав клавишу Q.
9. Скрипт будет работать в том случае, если текст вопроса красный или зеленый. Иначе Q не сработает – то есть скрипт не загружен с помощью закладки.

Ответы сохраняются в new_answers.json в облаке, но имеется и старый файл all_answers.json с 2000+ вопросами. 
При отсутствии ответов они скачиваются в память браузера автоматически. Но можно скачать их отдельно (в базу браузера), нажав на N (new_answers.json) и O (all_answers.json ).
