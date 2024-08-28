const fileOldAnswers = 'https://aepp.ru/pse/all_answers.json';
const fileNewAnswers = 'https://aepp.ru/pse/new_answers.json';
const urlFunction = 'https://functions.yandexcloud.net/d4e8e1vpncq8vriivpin';

const classNameQuestionType = 'ant-typography';     //[2]
const classNameQuestion = 'ant-typography';         //[1]
const classNameAnswers = 'answer';           //[ ...]
//const classNameAnswerNumber = 'js-number-answer'; //[?]

const isCorrectColor = "#55AA55";
const unCorrectColor = "#D46A6A";

const QuestionTypes = {
	TF: {
	  questionHelpText: 'Р’С‹Р±РµСЂРёС‚Рµ РѕРґРёРЅ РїСЂР°РІРёР»СЊРЅС‹Р№ РѕС‚РІРµС‚ Рё РЅР°Р¶РјРёС‚Рµ РєРЅРѕРїРєСѓ "РџРѕРґС‚РІРµСЂРґРёС‚СЊ"', 
	  hintsTitle: "РџРѕРґСЃРєР°Р·РєР°. РџСЂР°РІРёР»СЊРЅС‹Р№ РѕС‚РІРµС‚:",
	},
	MC: {
	  questionHelpText: 'Р’С‹Р±РµСЂРёС‚Рµ РѕРґРёРЅ РїСЂР°РІРёР»СЊРЅС‹Р№ РѕС‚РІРµС‚ Рё РЅР°Р¶РјРёС‚Рµ РєРЅРѕРїРєСѓ "РџРѕРґС‚РІРµСЂРґРёС‚СЊ"',
	  hintsTitle: "РџРѕРґСЃРєР°Р·РєР°. РџСЂР°РІРёР»СЊРЅС‹Р№ РѕС‚РІРµС‚:",
	},
	MR: {
	  questionHelpText: 'Р’С‹Р±РµСЂРёС‚Рµ РЅРµСЃРєРѕР»СЊРєРѕ РїСЂР°РІРёР»СЊРЅС‹С… РѕС‚РІРµС‚РѕРІ Рё РЅР°Р¶РјРёС‚Рµ РєРЅРѕРїРєСѓ "РџРѕРґС‚РІРµСЂРґРёС‚СЊ"',
	  hintsTitle: "РџРѕРґСЃРєР°Р·РєР°. РџСЂР°РІРёР»СЊРЅС‹Рµ РѕС‚РІРµС‚С‹:",
	},
	SEQ: {
	  questionHelpText: 'Р’С‹Р±РµСЂРёС‚Рµ РѕС‚РІРµС‚С‹ РІ РїСЂР°РІРёР»СЊРЅРѕР№ РїРѕСЃР»РµРґРѕРІР°С‚РµР»СЊРЅРѕСЃС‚Рё Рё РЅР°Р¶РјРёС‚Рµ РєРЅРѕРїРєСѓ "РџРѕРґС‚РІРµСЂРґРёС‚СЊ"',
	  hintsTitle: "РџРѕРґСЃРєР°Р·РєР°. РџСЂР°РІРёР»СЊРЅС‹Р№ РїРѕСЂСЏРґРѕРє:",
	},
	NUMG: {
	  questionHelpText: 'Р’РІРµРґРёС‚Рµ РїСЂР°РІРёР»СЊРЅС‹Р№ РѕС‚РІРµС‚ Рё РЅР°Р¶РјРёС‚Рµ РєРЅРѕРїРєСѓ "РџРѕРґС‚РІРµСЂРґРёС‚СЊ"',
	  hintsTitle: "РџРѕРґСЃРєР°Р·РєР°. РџСЂР°РІРёР»СЊРЅС‹Р№ РѕС‚РІРµС‚:",
	},
};

const getElements = (classElements) => {
	let elements = document.getElementsByClassName(classElements);
	return elements;
};

const getQuestionTypeElement = (classElements = classNameQuestionType) => {
	return getElements(classElements)[2];
};

const getQuestionElement = (classElements = classNameQuestion) => {
	return getElements(classElements)[1];
};

const getAnswerElements = (classElements = classNameAnswers) => {
	return getElements(classElements);
};

// const getNumberElement = (classElements = classNameAnswerNumber) => {
// 	return getElements(classElements)[0];
// };

const setColorElement = (obj, color) => {
	obj.style.backgroundColor = color;
};

const isJSONString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const isSecondaryKey = (masterKey, secondaryKey) => {
	if (isJSONString(localStorage.getItem(masterKey))) {
		return Object.keys(JSON.parse(localStorage.getItem(masterKey))).includes(secondaryKey);
	} else {
		console.log('Р­С‚Рѕ РЅРµ JSON: ' + masterKey)
	}
	
};

const getItemLSText = (keyName, att) => {
	if (isSecondaryKey(keyName, att)) {
		return JSON.parse(localStorage.getItem(keyName))[att];
	} else {
		console.log('РќРµС‚ С‚Р°РєРѕРіРѕ Р°С‚СЂРёР±СѓС‚Р°: ' + keyName);
	}
};

const getFromServer = (url) => {
	let response = {
		run: function (url) {
			let headers = {
				'Content-Type': 'application/json;charset=utf-8',
			};
			fetch(url, {
					'method': 'GET',
					'mode': 'cors',
					'credentials': 'include',
					'cache': 'no-cache',
					'headers': headers
				})
				.then(response => this.check(response))
				.then(data => this.success(data))
				.catch(error => this.error(error));

		},
		check: function (response) {
			if (response.status !== 200) {
				console.log('РџРѕС…РѕР¶Рµ, РІРѕР·РЅРёРєР»Р° РїСЂРѕР±Р»РµРјР°. РљРѕРґ СЃРѕСЃС‚РѕСЏРЅРёСЏ: ' + response.status);
				//showAlert('warning', 'РџРѕС…РѕР¶Рµ, РІРѕР·РЅРёРєР»Р° РїСЂРѕР±Р»РµРјР°. РљРѕРґ СЃРѕСЃС‚РѕСЏРЅРёСЏ: ' + response.status);
				return;
			}
			return response.json();
		},
		success: function (data) {
			console.log('Р”Р°РЅРЅС‹Рµ РїРѕР»СѓС‡РµРЅС‹!');
			//showAlert('success', 'Р”Р°РЅРЅС‹Рµ РїРѕР»СѓС‡РµРЅС‹!');
			importToLocalStorage(data);
		},
		error: function (error) {
			console.log('РћС€РёР±РєР°: ', error);
			//showAlert('danger', 'РћС€РёР±РєР° РїРѕР»СѓС‡РµРЅРЅС‹С… РґР°РЅРЅС‹С… РЅР° СЃРµСЂРІРµСЂ: ' + error);
		}
	};

	response.run(url);
};

const importToLocalStorage = (data) => {

	const queries = data;//.map(item => JSON.parse(item));
	let questionData = {};
	let keyName = '';
	for (let query of queries) {
		if (Object.values(query)[0] == undefined) {
			console.log(query);
			continue;
		}
		questionData = (typeof(Object.values(query)[0]) == 'object') ? 
			Object.values(query)[0] : JSON.parse(Object.values(query)[0]);
		keyName = Object.keys(query)[0];
		if (questionData.hasOwnProperty('correctAnswerText') || questionData.hasOwnProperty('correctAnswerID')) {
			if (questionData.correctAnswerText != [] || questionData.correctAnswerID != []) {
				importAnswers(keyName, questionData);
			}
		}
	}
};

const importAnswers = (key, data) => {
	let questionSerial = JSON.stringify(data);
	try {
		localStorage.setItem(key, questionSerial);
	} catch (e) {
		if (e == QUOTA_EXCEEDED_ERR) {
			console.log('Р‘Р°Р·Р° РґР°РЅРЅС‹С… РІ Р±СЂР°СѓР·РµСЂРµ РїРµСЂРµРїРѕР»РЅРµРЅР°, РґР°Р№С‚Рµ РїРѕРґР·Р°С‚С‹Р»СЊРЅРёРє РїСЂРѕРіСЂР°РјРјРёСЃС‚Сѓ-СЃР°РјРѕР·РІР°РЅС†Сѓ');
			//showAlert('danger', 'Р‘Р°Р·Р° РґР°РЅРЅС‹С… РІ Р±СЂР°СѓР·РµСЂРµ РїРµСЂРµРїРѕР»РЅРµРЅР°, РґР°Р№С‚Рµ РїРѕРґР·Р°С‚С‹Р»СЊРЅРёРє РїСЂРѕРіСЂР°РјРјРёСЃС‚Сѓ-СЃР°РјРѕР·РІР°РЅС†Сѓ');
		}
	}
	
};

// let timerId = setInterval(() => getCorrectAnswer(), 5000);



const getCorrectAnswerLS = () => {
	const keyNames = Object.keys(localStorage);
	const questionElement = getQuestionElement();
	const questionText = questionElement.innerText;
	const answerElements = getAnswerElements(); 
	
	for (let keyName of keyNames) {
		if ( ['accessToken', 'testTotalTime', 'testStartTime'].includes(keyName)) continue;
		let questionTextLS = getItemLSText(keyName, 'questionText')
		if (questionText == questionTextLS) {
			setColorElement(questionElement, isCorrectColor);
			// clearInterval(timerId);
			let correctAnswers = getItemLSText(keyName, 'correctAnswerText');
			for (let answerElement of answerElements) { 
				for (let correctAnswer of correctAnswers) {
					if (answerElement.innerText == correctAnswer) {
						setColorElement(answerElement, isCorrectColor);
						break;
					} else {
						setColorElement(answerElement, unCorrectColor);
					}
				}
			}
			return;
		} else {
			setColorElement(questionElement, unCorrectColor);
		}
	}
}


// const getObj = (key, value) => {
// 	result = {};
// 	result[key] = value;
// 	return result;
// };

// let nextPosition;
// const showAlert = (style, message, timeoutAlert = 5000) => {
// 	const alert = document.createElement('div');
// 	let alertPosition;
// 	alert.style.position = "absolute";
// 	alert.style.zIndex = "999999";
// 	alert.style.left = "10px";
// 	alert.style.bottom = "10px";
// 	alert.style.width = (window.innerWidth > 1024) ? "30%" : "90%";
// 	alert.style.height = (message.length < 45) ? "50px" : "75px";
// 	// alert.className = "alert alert-" + style;
// 	alert.innerHTML = message;
// 	if (document.getElementsByClassName('alert').length == 0) { // This must be changed
// 		document.body.append(alert);
// 		alertPosition = 10;
// 		nextPosition = 10;
// 	} else if (parseInt(document.getElementsByClassName('alert')[document.getElementsByClassName('alert').length - 1].style.bottom.match(/\d+/)) < 500) {
// 		alertPosition = (alert.style.height == "50px") ? 70 : (nextPosition == 10) ? 70 : 95;
// 		nextPosition += alertPosition;
// 		alert.style.bottom = nextPosition + "px";
// 		document.body.append(alert);
// 	}
// 	alert.addEventListener('click', () => alert.remove())
// 	setTimeout(() => alert.remove(), timeoutAlert);
// };

// const getCorrectAnswerLS = () => {
// 	const questionType = getQuestionTypeElement();
// 	const questionElement = getQuestionElement();
// 	const questionText =  questionElement.innerText;    //  getClearText(questionElement);
// 	const answerElements = getAnswerElements();         //  (questionType === "NUMG") ? getNumberElement() : getAnswerElements();
// 	                                                    //  const keyName = getKeyName();
// 	                                                    //  const oldKeyName = questionType + '-';
// 	if (localStorage.length) {
// 		if (keyName in localStorage) {
// 			setCorrectElement(questionElement);
// 			                                            // showAlert('success', 'Р’РѕРїСЂРѕСЃ РЅР°Р№РґРµРЅ');
// 			                                            // if ('NUMG' == questionType) {
// 			                                            // 	if (isSecondaryKey(keyName, 'correctAnswerText')) { //.?
// 			                                            // 		answerElements.placeholder = getValueLS('correctAnswerText')[0];
// 			                                            // 	} else {
// 			                                            // 		showAlert('warning', 'Рђ РѕС‚РІРµС‚Р° РЅРµС‚...');
// 			                                            // 		return;
// 			                                            // 	}
// 			                                            // } else {
// 			if (isSecondaryKey(keyName, 'correctAnswerID')) { //.?
// 				let values = getValueLS('correctAnswerID');
// 					for (let idCorrectAnswer of values) {
// 						for (let answerElement of answerElements) {
// 							if (getAnswerText(answerElement) == idCorrectAnswer) { //NO
// 								setCorrectElement(answerElement);
// 							}
// 						}
// 					}
// 				} else {
// 					showAlert('warning', 'Рђ РѕС‚РІРµС‚РѕРІ РЅРµС‚...');
// 					return;
// 				}
// 			// }
// 			setAutoCorrectAnswer(saveAnswers());
// 			return;
// 		} else {
// 			let index = 0;
// 			for (index; index <= localStorage.length; index++) {
// 				if ((oldKeyName + index) in localStorage) {
// 					if (isSecondaryKey(oldKeyName + index, 'questionText')) { //.?
// 						if (questionText == getValueLS('questionText', oldKeyName + index)) {
// 							questionElement.style.color = "green";
// 							showAlert('primary', 'Р’РѕРїСЂРѕСЃ РЅР°Р№РґРµРЅ СЃСЂРµРґРё СЃС‚Р°СЂС‹С…');
// 							if (isSecondaryKey(oldKeyName + index, 'correctAnswerText')) { //.?
// 								if ('NUMG' == questionType) {
// 									answerElements.placeholder = getValueLS('correctAnswerText', oldKeyName + index)[0];
// 									setAutoCorrectAnswer(saveAnswers());
// 									removeAnswers(oldKeyName + index);
// 									return; 
// 								} else {
// 									let correctAnswerTexts = getValueLS('correctAnswerText', oldKeyName + index);
// 									let isCorrectAnswer = false;
// 									for (let textCorrectAnswer of correctAnswerTexts) {
// 										for (let answerElement of answerElements) {
// 											if (answerElement.innerHTML == textCorrectAnswer || answerElement.innerText == textCorrectAnswer) { //РљРѕСЃСЏРє
// 												isCorrectAnswer = true;
// 												if ('SEQ' == questionType) {
// 													saveAnswersSEQ(oldKeyName + index);
// 													setOrderCorrectAnswer(answerElement);
// 													setCorrectAnswer(answerElement);
// 												} else {
// 													setCorrectAnswer(answerElement);
// 												}

// 											}
// 										}
// 									}
// 									if (isCorrectAnswer) {
// 										showAlert('warning', 'РџСЂРѕРІРµСЂСЊ, РѕС‚РІРµС‚С‹ РјРѕРіСѓС‚ Р±С‹С‚СЊ РЅРµ С‚РѕС‡РЅС‹РјРё...');
// 										setAutoCorrectAnswer(saveAnswers());
// 										removeAnswers(oldKeyName + index);
// 										return; 
// 									} else {
// 										showAlert('warning', 'Рђ РѕС‚РІРµС‚РѕРІ РЅРµС‚, Р»РёР±Рѕ РЅРµ СЃРѕРІРїР°РґР°СЋС‚...');
// 										return;
// 									}
// 								}
// 							} else {
// 								showAlert('warning', 'Рђ РѕС‚РІРµС‚РѕРІ РЅРµС‚...');
// 							}
// 						}
// 					} else {
// 						showAlert('warning', 'Р’РѕРїСЂРѕСЃР° РІРѕРѕР±С‰Рµ РЅРµС‚, РїРµСЂРІС‹Р№ СЂР°Р· С‚Р°РєРѕРµ...');
// 					}
// 				}
// 			}
// 			questionElement.style.color = "red";
// 			showAlert('warning', 'Р’РѕРїСЂРѕСЃР° РЅРµС‚ РёР»Рё РЅРµ СЃРѕРІРїР°РґР°РµС‚...');
// 		}
// 	} else {
// 		showAlert('warning', 'Рљ СЃРѕР¶Р°Р»РµРЅРёСЋ, Р±Р°Р·Р° РѕС‚РІРµС‚РѕРІ РїСѓСЃС‚Р°. РџРµСЂРµР·Р°РіСЂСѓР·РёС‚Рµ СЃС‚СЂР°РЅРёС†Сѓ Рё РїРѕРїСЂРѕР±СѓР№С‚Рµ СЃРЅРѕРІР°...', 10000);
// 		getFromServer(fileOldAnswers);
// 		getFromServer(fileNewAnswers);
// 	}
// };

