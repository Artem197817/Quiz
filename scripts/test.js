(function () {
    const Test = {
        quiz: null,
        currentQuestionIndex: 1,
        testTitleElement: null,
        testOptionsElement: null,
        nextButtonElement: null,
        prevButtonElement: null,
        passButtonElement: null,
        userResult: [],
        progresBarElement: null,
        userTest: null,
        passLinkElement: null,

        init: function () {
            checkUserData();
            const url = new URL(location.href);
            const testId = url.searchParams.get('id');
            if (testId) {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", 'https://testologia.ru/get-quiz?id=' + testId, false);
                xhr.send();
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                    this.startQuiz();
                } else {
                    location.href = 'index.html';
                }

                this.userTest = JSON.parse(sessionStorage.getItem('userTest'));

            }
        },
        startQuiz: function () {
            this.testTitleElement = document.getElementById('title');
            this.testOptionsElement = document.getElementById('options');
            this.nextButtonElement = document.getElementById('next');
            this.nextButtonElement.onclick = this.move.bind(this, 'next')
            this.passButtonElement = document.getElementById('pass');
            this.passButtonElement.onclick = this.move.bind(this, 'pass')
            this.prevButtonElement = document.getElementById('prev');
            this.prevButtonElement.onclick = this.move.bind(this, 'prev')
            document.getElementById('pre-title').innerText = this.quiz.name;
            this.progresBarElement = document.getElementById('progress-bar');
            this.passLinkElement = document.querySelector('.pass-link');

            this.prepareProgressBar();
            this.showQuestion();

            const timerElement = document.getElementById('timer');
            let seconds = 59;

            const interval = setInterval(function () {
                seconds--;

                timerElement.innerText = seconds;

                if (seconds <= 0) {
                    clearInterval(interval);
                    this.complete();
                }
            }.bind(this), 1000);
            },

        prepareProgressBar() {

            for (let i = 0; i < this.quiz.questions.length; i++) {
                const itemElement = document.createElement('div')
                itemElement.className = 'progress-bar-item ' + (i === 0 ? 'active' : '');

                const circleElement = document.createElement('div');
                circleElement.className = 'progress-bar-item-circle';
                const textElement = document.createElement('div');
                textElement.className = 'progress-bar-item-text';
                textElement.innerText = 'Вопрос' + (i + 1);

                itemElement.appendChild(circleElement);
                itemElement.appendChild(textElement);

                this.progresBarElement.appendChild(itemElement);

            }
        },
        showQuestion: function () {
            const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
            const chosenOption = this.userResult.find(item => item.questionId === activeQuestion.id);
            this.testTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex
                + ': </span> ' + activeQuestion.question;

            this.passLinkElement.classList.remove('disabled-link')
            this.testOptionsElement.innerHTML = '';
            const that = this;
            activeQuestion.answers.forEach((answer) => {
                const testOptionElement = document.createElement('div');
                testOptionElement.className = 'test-question-option';
                const inputId = 'answer-' + answer.id;
                const inputElement = document.createElement('input');
                inputElement.className = 'option-answer'
                inputElement.setAttribute('id', inputId);
                inputElement.setAttribute('type', 'radio');
                inputElement.setAttribute('name', 'answer');
                inputElement.setAttribute('value', answer.id);
                if (chosenOption && chosenOption.chosenAnswerId === answer.id) {
                    inputElement.setAttribute('checked', 'checked')
                }

                inputElement.onchange = function () {
                    that.chooseAnswer();
                }

                const inputLabelElement = document.createElement('label');
                inputLabelElement.setAttribute('for', inputId);
                inputLabelElement.innerText = answer.answer;

                testOptionElement.appendChild(inputElement);
                testOptionElement.appendChild(inputLabelElement);

                this.testOptionsElement.appendChild(testOptionElement);
            });

            if (chosenOption && chosenOption.chosenAnswerId) {
                this.nextButtonElement.removeAttribute('disabled')
            } else {
                this.nextButtonElement.setAttribute('disabled', 'disabled');
            }

            if (this.currentQuestionIndex === this.quiz.questions.length) {
                this.nextButtonElement.innerText = 'Завершить';
            } else {
                this.nextButtonElement.innerText = 'Далее';
            }
            if (this.currentQuestionIndex > 1) {
                this.prevButtonElement.removeAttribute('disabled');
            } else {
                this.prevButtonElement.setAttribute('disabled', 'disabled');
            }

        },
        chooseAnswer: function () {
            this.nextButtonElement.removeAttribute('disabled');
            this.passLinkElement.classList.add('disabled-link');
        },
        move(action) {
            const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
            const choosenAnswer = Array.from(document.getElementsByClassName('option-answer')).find(element => {
                return element.checked;
            });

            let chosenAnswerId = null;
            if (!choosenAnswer) {
                chosenAnswerId = -1;
                const existingResult = this.userResult.find(item => {
                    return item.questionId === activeQuestion.id;
                })
                if (existingResult) {
                    existingResult.chosenAnswerId = chosenAnswerId
                } else {
                    this.userResult.push({
                        questionId: activeQuestion.id,
                        chosenAnswerId: chosenAnswerId
                    })
                }
            }

            if (choosenAnswer && choosenAnswer.value) {
                chosenAnswerId = Number(choosenAnswer.value);

                const existingResult = this.userResult.find(item => {
                    return item.questionId === activeQuestion.id;
                })
                if (existingResult) {
                    existingResult.chosenAnswerId = chosenAnswerId
                } else {
                    this.userResult.push({
                        questionId: activeQuestion.id,
                        chosenAnswerId: chosenAnswerId
                    })
                }
            }

            if (action === 'next' || action === 'pass') {
                this.currentQuestionIndex++;
            } else {
                this.currentQuestionIndex--;
            }
            if (this.currentQuestionIndex > this.quiz.questions.length) {
                this.complete();
                return
            }

            Array.from(this.progresBarElement.children).forEach((item, index) => {
                const currentIndex = index + 1;
                item.classList.remove('active');
                item.classList.remove('complete');

                if (currentIndex === this.currentQuestionIndex) {
                    item.classList.add('active')
                } else if (currentIndex < this.currentQuestionIndex) {
                    item.classList.add('complete')
                }

            })

            this.showQuestion();
        },
        complete() {
            const url = new URL(location.href);
            const testId = url.searchParams.get('id');
            const name = url.searchParams.get('name');
            const lastName = url.searchParams.get('lastName');
            const email = url.searchParams.get('email');

            const xhr = new XMLHttpRequest();
            xhr.open("POST", 'https://testologia.ru/pass-quiz?id=' + testId, false);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhr.send(JSON.stringify({
                name: name,
                lastName: lastName,
                email: email,
                results: this.userResult,
            }));

            if (xhr.status === 200 && xhr.responseText) {
                let result = null;
                try {
                    result = JSON.parse(xhr.responseText);
                } catch (e) {
                    location.href = 'index.html';
                }
                if (result) {
                    this.userTest.userAnswer = this.userResult;
                    this.userTest.result = result;

                    sessionStorage.setItem("userTest", JSON.stringify(this.userTest))
                    location.href = 'result.html?score=' + result.score + '&total=' + result.total;
                }
            } else {
                location.href = 'index.html';
            }
        }


    }

    Test.init();
})();

