/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router.js */ \"./src/router.js\");\n\nclass App {\n  constructor() {\n    this.router = new _router_js__WEBPACK_IMPORTED_MODULE_0__.Router();\n    window.addEventListener('DOMContentLoaded', () => {\n      this.router.openRoute();\n    });\n    window.addEventListener('popstate', () => {\n      this.router.openRoute();\n    });\n  }\n}\nnew App();\n\n//# sourceURL=webpack://quiz/./src/app.js?");

/***/ }),

/***/ "./src/components/answer.js":
/*!**********************************!*\
  !*** ./src/components/answer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Answer: () => (/* binding */ Answer)\n/* harmony export */ });\nclass Answer {\n  constructor() {\n    this.quiz = null;\n    this.rightAnswer = [];\n    this.user = JSON.parse(sessionStorage.getItem('user'));\n    this.userTest = JSON.parse(sessionStorage.getItem('userTest'));\n    if (this.user && this.userTest) {\n      const xhr = new XMLHttpRequest();\n      xhr.open(\"GET\", 'https://testologia.ru/get-quiz?id=' + this.userTest.testId, false);\n      xhr.send();\n      if (xhr.status === 200 && xhr.responseText) {\n        try {\n          this.quiz = JSON.parse(xhr.responseText);\n        } catch (e) {\n          location.href = '#/';\n        }\n      } else {\n        location.href = '#/';\n      }\n      xhr.open(\"GET\", 'https://testologia.ru/get-quiz-right?id=' + this.userTest.testId, false);\n      xhr.send();\n      if (xhr.status === 200 && xhr.responseText) {\n        try {\n          this.rightAnswer = JSON.parse(xhr.responseText);\n          console.log(this.rightAnswer);\n        } catch (e) {\n          location.href = '#/';\n        }\n      } else {\n        location.href = '#/';\n      }\n      this.showInfo();\n      this.showAnswer();\n    } else {\n      location.href = '#/';\n    }\n  }\n  showInfo() {\n    document.getElementById('pre-title').innerText = this.quiz.name;\n    document.getElementById('tested').innerText = this.user.name + ' ' + this.user.lastName + ', ' + this.user.email;\n  }\n  showAnswer() {\n    let index = 0;\n    let arrUserAnswers = [];\n    this.userTest.userAnswer.forEach(function (answer) {\n      arrUserAnswers.push(answer.chosenAnswerId);\n      console.log(answer);\n      console.log(arrUserAnswers);\n    });\n    const answerBlock = document.getElementById('answer-block');\n    this.quiz.questions.forEach(question => {\n      const answerQuestionElement = document.createElement('div');\n      answerQuestionElement.className = 'answer-question';\n      const answerTitleElement = document.createElement('h2');\n      answerTitleElement.className = 'answer-title';\n      answerTitleElement.innerHTML = '<span>Вопрос ' + (index + 1) + ': </span> ' + question.question;\n      const answersElement = document.createElement('div');\n      answersElement.className = 'answer-answers';\n      answerQuestionElement.appendChild(answerTitleElement);\n      question.answers.forEach(answer => {\n        const answerElement = document.createElement('div');\n        answerElement.className = 'answer-answer';\n        answerElement.innerText = answer.answer;\n        if (answer.id !== this.rightAnswer[index] && answer.id === arrUserAnswers[index]) {\n          answerElement.style.color = '#DC3333';\n          answerElement.classList.add('invalid-answer');\n        } else {\n          if (answer.id === this.rightAnswer[index] && answer.id === arrUserAnswers[index]) {\n            answerElement.style.color = '#5FDC33';\n            answerElement.classList.add('right-answer');\n          }\n        }\n        answersElement.appendChild(answerElement);\n      });\n      answerQuestionElement.appendChild(answersElement);\n      answerBlock.appendChild(answerQuestionElement);\n      index++;\n    });\n  }\n}\n\n//# sourceURL=webpack://quiz/./src/components/answer.js?");

/***/ }),

/***/ "./src/components/choice.js":
/*!**********************************!*\
  !*** ./src/components/choice.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Choice: () => (/* binding */ Choice)\n/* harmony export */ });\n/* harmony import */ var _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/url-manager.js */ \"./src/utils/url-manager.js\");\n\nclass Choice {\n  constructor() {\n    this.quizzes = [];\n    this.routesParam = _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__.UrlManager.getQueryParam();\n    _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__.UrlManager.checkUserData(this.routesParam);\n    const xhr = new XMLHttpRequest();\n    xhr.open(\"GET\", 'https://testologia.ru/get-quizzes', false);\n    xhr.send();\n    if (xhr.status === 200 && xhr.responseText) {\n      try {\n        this.quizzes = JSON.parse(xhr.responseText);\n      } catch (e) {\n        // location.href = '#/';\n      }\n      this.processQuizzes();\n    } else {\n      // location.href = '#/';\n    }\n  }\n  processQuizzes() {\n    if (this.quizzes && this.quizzes.length > 0) {\n      const choiceOptionsElement = document.getElementById('choice-options');\n      this.quizzes.forEach(quiz => {\n        const that = this;\n        const choiceOptionElement = document.createElement('div');\n        choiceOptionElement.className = 'choice-option';\n        choiceOptionElement.setAttribute('data-id', quiz.id);\n        choiceOptionElement.onclick = function () {\n          that.choiceQuiz(this);\n        };\n        const choiceOptionTextElement = document.createElement('div');\n        choiceOptionTextElement.className = 'choice-option-text';\n        choiceOptionTextElement.innerText = quiz.name;\n        const choiceOptionArrowElement = document.createElement('div');\n        choiceOptionArrowElement.className = 'choice-option-arrow';\n        const choiceOptionImageElement = document.createElement('img');\n        choiceOptionImageElement.setAttribute('src', 'images/arrow.png');\n        choiceOptionImageElement.setAttribute('alt', 'arrow.png');\n        choiceOptionArrowElement.appendChild(choiceOptionImageElement);\n        choiceOptionElement.appendChild(choiceOptionTextElement);\n        choiceOptionElement.appendChild(choiceOptionArrowElement);\n        choiceOptionsElement.appendChild(choiceOptionElement);\n      });\n    }\n  }\n  choiceQuiz(element) {\n    const dataId = element.getAttribute('data-id');\n    if (dataId) {\n      let userTest = {\n        testId: dataId\n      };\n      if (sessionStorage.getItem('userTest')) {\n        sessionStorage.removeItem('userTest');\n      }\n      sessionStorage.setItem(\"userTest\", JSON.stringify(userTest));\n      location.href = '#/test?name=' + this.routesParam.name + '&lastName=' + this.routesParam.lastName + '&email=' + this.routesParam.email + '&id=' + dataId;\n    }\n  }\n}\n\n//# sourceURL=webpack://quiz/./src/components/choice.js?");

/***/ }),

/***/ "./src/components/form.js":
/*!********************************!*\
  !*** ./src/components/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Form: () => (/* binding */ Form)\n/* harmony export */ });\nclass Form {\n  constructor() {\n    this.elementAgree = null, this.processElement = null, this.fields = [{\n      name: 'name',\n      id: 'name',\n      element: null,\n      regex: /^[A-Za-zА-Яа-яЁё\\s]+$/,\n      valid: false\n    }, {\n      name: 'lastName',\n      id: 'last-name',\n      element: null,\n      regex: /^[A-Za-zА-Яа-яЁё\\s]+$/,\n      valid: false\n    }, {\n      name: 'email',\n      id: 'email',\n      element: null,\n      regex: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,\n      valid: false\n    }];\n    const that = this;\n    this.fields.forEach(item => {\n      item.element = document.getElementById(item.id);\n      item.element.onchange = function () {\n        that.validateField.call(that, item, this);\n      };\n    });\n    this.processElement = document.getElementById('process');\n    this.processElement.onclick = function () {\n      that.processForm();\n    };\n    this.elementAgree = document.getElementById('agree');\n    this.elementAgree.onchange = function () {\n      that.validateForm();\n    };\n  }\n  validateField(field, element) {\n    if (!element.value || !element.value.match(field.regex)) {\n      element.parentNode.style.borderColor = 'red';\n      field.valid = false;\n    } else {\n      element.parentNode.removeAttribute('style');\n      field.valid = true;\n    }\n    this.validateForm();\n  }\n  validateForm() {\n    const validForm = this.fields.every(item => item.valid);\n    const isValid = this.elementAgree.checked && validForm;\n    if (isValid) {\n      this.processElement.removeAttribute('disabled');\n    } else {\n      this.processElement.setAttribute('disabled', 'disabled');\n    }\n    return isValid;\n  }\n  processForm() {\n    if (this.validateForm) {\n      let paramString = '';\n      let user = {};\n      this.fields.forEach(item => {\n        paramString += (!paramString ? '?' : '&') + item.name + '=' + item.element.value;\n        user[item.name] = item.element.value;\n      });\n      if (sessionStorage.getItem('user')) {\n        sessionStorage.clear;\n      }\n      sessionStorage.setItem(\"user\", JSON.stringify(user));\n      location.href = '#/choice' + paramString;\n    }\n  }\n}\n\n//# sourceURL=webpack://quiz/./src/components/form.js?");

/***/ }),

/***/ "./src/components/result.js":
/*!**********************************!*\
  !*** ./src/components/result.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Result: () => (/* binding */ Result)\n/* harmony export */ });\nclass Result {\n  constructor() {\n    this.userTest = null;\n    this.userTest = JSON.parse(sessionStorage.getItem('userTest'));\n    console.log(this.userTest);\n    this.showResult();\n  }\n  showResult() {\n    document.getElementById('result-scope').innerText = this.userTest.result.score + '/' + this.userTest.result.total;\n  }\n}\n\n//# sourceURL=webpack://quiz/./src/components/result.js?");

/***/ }),

/***/ "./src/components/test.js":
/*!********************************!*\
  !*** ./src/components/test.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Test: () => (/* binding */ Test)\n/* harmony export */ });\n/* harmony import */ var _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/url-manager.js */ \"./src/utils/url-manager.js\");\n\nclass Test {\n  constructor() {\n    this.quiz = null;\n    this.currentQuestionIndex = 1;\n    this.testTitleElement = null;\n    this.testOptionsElement = null;\n    this.nextButtonElement = null;\n    this.prevButtonElement = null;\n    this.passButtonElement = null;\n    this.userResult = [];\n    this.progresBarElement = null;\n    this.userTest = JSON.parse(sessionStorage.getItem('userTest'));\n    this.passLinkElement = null;\n    this.routesParam = _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__.UrlManager.getQueryParam();\n    this.user = JSON.parse(sessionStorage.getItem('user'));\n    _utils_url_manager_js__WEBPACK_IMPORTED_MODULE_0__.UrlManager.checkUserData(this.routesParam);\n    const testId = this.userTest.testId;\n    if (testId) {\n      const xhr = new XMLHttpRequest();\n      xhr.open(\"GET\", 'https://testologia.ru/get-quiz?id=' + testId, false);\n      xhr.send();\n      if (xhr.status === 200 && xhr.responseText) {\n        try {\n          this.quiz = JSON.parse(xhr.responseText);\n        } catch (e) {\n          location.href = '#/';\n        }\n        this.startQuiz();\n      } else {\n        location.href = '#/';\n      }\n    }\n  }\n  startQuiz() {\n    this.testTitleElement = document.getElementById('title');\n    this.testOptionsElement = document.getElementById('options');\n    this.nextButtonElement = document.getElementById('next');\n    this.nextButtonElement.onclick = this.move.bind(this, 'next');\n    this.passButtonElement = document.getElementById('pass');\n    this.passButtonElement.onclick = this.move.bind(this, 'pass');\n    this.prevButtonElement = document.getElementById('prev');\n    this.prevButtonElement.onclick = this.move.bind(this, 'prev');\n    document.getElementById('pre-title').innerText = this.quiz.name;\n    this.progresBarElement = document.getElementById('progress-bar');\n    this.passLinkElement = document.querySelector('.pass-link');\n    this.prepareProgressBar();\n    this.showQuestion();\n    const timerElement = document.getElementById('timer');\n    let seconds = 59;\n    const interval = setInterval(function () {\n      seconds--;\n      timerElement.innerText = seconds;\n      if (seconds <= 0) {\n        clearInterval(interval);\n        this.complete();\n      }\n    }.bind(this), 1000);\n  }\n  prepareProgressBar() {\n    for (let i = 0; i < this.quiz.questions.length; i++) {\n      const itemElement = document.createElement('div');\n      itemElement.className = 'progress-bar-item ' + (i === 0 ? 'active' : '');\n      const circleElement = document.createElement('div');\n      circleElement.className = 'progress-bar-item-circle';\n      const textElement = document.createElement('div');\n      textElement.className = 'progress-bar-item-text';\n      textElement.innerText = 'Вопрос' + (i + 1);\n      itemElement.appendChild(circleElement);\n      itemElement.appendChild(textElement);\n      this.progresBarElement.appendChild(itemElement);\n    }\n  }\n  showQuestion() {\n    const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];\n    const chosenOption = this.userResult.find(item => item.questionId === activeQuestion.id);\n    this.testTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex + ': </span> ' + activeQuestion.question;\n    this.passLinkElement.classList.remove('disabled-link');\n    this.testOptionsElement.innerHTML = '';\n    const that = this;\n    activeQuestion.answers.forEach(answer => {\n      const testOptionElement = document.createElement('div');\n      testOptionElement.className = 'test-question-option';\n      const inputId = 'answer-' + answer.id;\n      const inputElement = document.createElement('input');\n      inputElement.className = 'option-answer';\n      inputElement.setAttribute('id', inputId);\n      inputElement.setAttribute('type', 'radio');\n      inputElement.setAttribute('name', 'answer');\n      inputElement.setAttribute('value', answer.id);\n      if (chosenOption && chosenOption.chosenAnswerId === answer.id) {\n        inputElement.setAttribute('checked', 'checked');\n      }\n      inputElement.onchange = function () {\n        that.chooseAnswer();\n      };\n      const inputLabelElement = document.createElement('label');\n      inputLabelElement.setAttribute('for', inputId);\n      inputLabelElement.innerText = answer.answer;\n      testOptionElement.appendChild(inputElement);\n      testOptionElement.appendChild(inputLabelElement);\n      this.testOptionsElement.appendChild(testOptionElement);\n    });\n    if (chosenOption && chosenOption.chosenAnswerId) {\n      this.nextButtonElement.removeAttribute('disabled');\n    } else {\n      this.nextButtonElement.setAttribute('disabled', 'disabled');\n    }\n    if (this.currentQuestionIndex === this.quiz.questions.length) {\n      this.nextButtonElement.innerText = 'Завершить';\n    } else {\n      this.nextButtonElement.innerText = 'Далее';\n    }\n    if (this.currentQuestionIndex > 1) {\n      this.prevButtonElement.removeAttribute('disabled');\n    } else {\n      this.prevButtonElement.setAttribute('disabled', 'disabled');\n    }\n  }\n  chooseAnswer() {\n    this.nextButtonElement.removeAttribute('disabled');\n    this.passLinkElement.classList.add('disabled-link');\n  }\n  move(action) {\n    const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];\n    const choosenAnswer = Array.from(document.getElementsByClassName('option-answer')).find(element => {\n      return element.checked;\n    });\n    let chosenAnswerId = null;\n    if (!choosenAnswer) {\n      chosenAnswerId = -1;\n      const existingResult = this.userResult.find(item => {\n        return item.questionId === activeQuestion.id;\n      });\n      if (existingResult) {\n        existingResult.chosenAnswerId = chosenAnswerId;\n      } else {\n        this.userResult.push({\n          questionId: activeQuestion.id,\n          chosenAnswerId: chosenAnswerId\n        });\n      }\n    }\n    if (choosenAnswer && choosenAnswer.value) {\n      chosenAnswerId = Number(choosenAnswer.value);\n      const existingResult = this.userResult.find(item => {\n        return item.questionId === activeQuestion.id;\n      });\n      if (existingResult) {\n        existingResult.chosenAnswerId = chosenAnswerId;\n      } else {\n        this.userResult.push({\n          questionId: activeQuestion.id,\n          chosenAnswerId: chosenAnswerId\n        });\n      }\n    }\n    if (action === 'next' || action === 'pass') {\n      this.currentQuestionIndex++;\n    } else {\n      this.currentQuestionIndex--;\n    }\n    if (this.currentQuestionIndex > this.quiz.questions.length) {\n      this.complete();\n      return;\n    }\n    Array.from(this.progresBarElement.children).forEach((item, index) => {\n      const currentIndex = index + 1;\n      item.classList.remove('active');\n      item.classList.remove('complete');\n      if (currentIndex === this.currentQuestionIndex) {\n        item.classList.add('active');\n      } else if (currentIndex < this.currentQuestionIndex) {\n        item.classList.add('complete');\n      }\n    });\n    this.showQuestion();\n  }\n  complete() {\n    const testId = this.userTest.testId;\n    const name = this.user.name;\n    const lastName = this.user.lastName;\n    const email = this.user.email;\n    const xhr = new XMLHttpRequest();\n    xhr.open(\"POST\", 'https://testologia.ru/pass-quiz?id=' + testId, false);\n    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');\n    xhr.send(JSON.stringify({\n      name: name,\n      lastName: lastName,\n      email: email,\n      results: this.userResult\n    }));\n    if (xhr.status === 200 && xhr.responseText) {\n      let result = null;\n      try {\n        result = JSON.parse(xhr.responseText);\n      } catch (e) {\n        location.href = '#/';\n      }\n      if (result) {\n        this.userTest.userAnswer = this.userResult;\n        this.userTest.result = result;\n        sessionStorage.setItem(\"userTest\", JSON.stringify(this.userTest));\n        location.href = '#/result';\n      }\n    } else {\n      location.href = '#/';\n    }\n  }\n}\n\n//# sourceURL=webpack://quiz/./src/components/test.js?");

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Router: () => (/* binding */ Router)\n/* harmony export */ });\n/* harmony import */ var _components_form_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/form.js */ \"./src/components/form.js\");\n/* harmony import */ var _components_choice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/choice.js */ \"./src/components/choice.js\");\n/* harmony import */ var _components_test_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/test.js */ \"./src/components/test.js\");\n/* harmony import */ var _components_result_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/result.js */ \"./src/components/result.js\");\n/* harmony import */ var _components_answer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/answer.js */ \"./src/components/answer.js\");\n\n\n\n\n\nclass Router {\n  constructor() {\n    this.routes = [{\n      routes: '#/',\n      title: 'Главная',\n      template: 'templates/index.html',\n      styles: 'styles/index.css',\n      load: () => {}\n    }, {\n      routes: '#/form',\n      title: 'Регистрация',\n      template: 'templates/form.html',\n      styles: 'styles/form.css',\n      load: () => {\n        new _components_form_js__WEBPACK_IMPORTED_MODULE_0__.Form();\n      }\n    }, {\n      routes: '#/choice',\n      title: 'Выбор теста',\n      template: 'templates/choice.html',\n      styles: 'styles/choice.css',\n      load: () => {\n        new _components_choice_js__WEBPACK_IMPORTED_MODULE_1__.Choice();\n      }\n    }, {\n      routes: '#/test',\n      title: 'Тест',\n      template: 'templates/test.html',\n      styles: 'styles/test.css',\n      load: () => {\n        new _components_test_js__WEBPACK_IMPORTED_MODULE_2__.Test();\n      }\n    }, {\n      routes: '#/result',\n      title: 'Результаты теста',\n      template: 'templates/result.html',\n      styles: 'styles/result.css',\n      load: () => {\n        new _components_result_js__WEBPACK_IMPORTED_MODULE_3__.Result();\n      }\n    }, {\n      routes: '#/answer',\n      title: 'Ответы',\n      template: 'templates/answer.html',\n      styles: 'styles/answer.css',\n      load: () => {\n        new _components_answer_js__WEBPACK_IMPORTED_MODULE_4__.Answer();\n      }\n    }];\n  }\n  async openRoute() {\n    const newRoute = this.routes.find(item => {\n      return item.routes === window.location.hash.split('?')[0];\n    });\n    if (!newRoute) {\n      window.location.href = \"#/\";\n      return;\n    }\n    document.getElementById('content').innerHTML = await fetch(newRoute.template).then(response => response.text());\n    document.getElementById('styles').setAttribute('href', newRoute.styles);\n    document.getElementById('page-title').innerText = newRoute.title;\n    newRoute.load();\n  }\n}\n\n//# sourceURL=webpack://quiz/./src/router.js?");

/***/ }),

/***/ "./src/utils/url-manager.js":
/*!**********************************!*\
  !*** ./src/utils/url-manager.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UrlManager: () => (/* binding */ UrlManager)\n/* harmony export */ });\nclass UrlManager {\n  static getQueryParam() {\n    const hash = document.location.hash.replace(/^#\\/?/, '');\n    const queryString = hash.split('?')[1] || '';\n    let params = {};\n    const re = /([^&=]+)=([^&]*)/g;\n    let tokens;\n    while (tokens = re.exec(queryString)) {\n      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2].replace(/\\+/g, ' '));\n    }\n    return params;\n  }\n  static checkUserData(params) {\n    if (!params.name || !params.lastName || !params.email) {\n      location.href = '#/';\n    }\n  }\n}\n\n//# sourceURL=webpack://quiz/./src/utils/url-manager.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;