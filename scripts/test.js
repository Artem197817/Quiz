(function (){
const Test = {
    quiz: null,
    currentQuestionIndex: 1,
    testTitleElement: null,
    testOptionsElement: null,
    nextButtonElement: null,
    prevButtonElement: null,


    init: function(){
        checkUserData();
        const url = new URL(location.href);
        const testId = url.searchParams.get('id');
        if(testId){
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
        }else {
            location.href = 'index.html';
            }

        }
    },
    startQuiz: function(){
        this.testTitleElement = document.getElementById('title');
        this.testOptionsElement = document.getElementById('options');
        this.nextButtonElement = document.getElementById('next');
        this.prevButtonElement = document.getElementById('prev');

        this.showQuestion();
    },
    showQuestion: function(){
        const activeQuestion = this.quiz.questions[this.currentQuestionIndex - 1];
        this.testTitleElement.innerHTML = '<span>Вопрос ' + this.currentQuestionIndex
            + ': </span> ' + activeQuestion.question;
        this.testOptionsElement.innerHTML = '';
        const that = this;
        activeQuestion.answers.forEach((answer) => {
            const testOptionElement = document.createElement('div');
            testOptionElement.className = 'test-question-option';

            const inputId = 'answer-' + answer.id;
            const inputElement = document.createElement('input');
            inputElement.setAttribute('id', inputId);
            inputElement.setAttribute('type', 'radio');
            inputElement.setAttribute('name', 'answer');
            inputElement.setAttribute('value', answer.id);

            inputElement.onchange = function(){
                that.chooseAnswer();
            }

            const inputLabelElement = document.createElement('label');
            inputLabelElement.setAttribute('for',inputId);
            inputLabelElement.innerText = answer.answer;

            testOptionElement.appendChild(inputElement);
            testOptionElement.appendChild(inputLabelElement);

            this.testOptionsElement.appendChild(testOptionElement);

        })
    },
    chooseAnswer: function(){
        this.nextButtonElement.removeAttribute('disabled');
    }


    }

Test.init();
})();