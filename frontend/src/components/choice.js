import {UrlManager} from '../utils/url-manager.js';
import {CustomHttp} from "../services/custom-http";

export class Choice {

    constructor() {
        this.quizzes = []
        this.init();
    }

    async init(){
        try{
           const result = await CustomHttp.request('http://localhost:3003/api/tests', 'GET');

            if(result){
                if(result.error){
                    throw new Error(result.error);
                }
                this.quizzes = result;
                this.processQuizzes();
            }

        }catch(error){
            console.log(error);
        }
    }

    processQuizzes() {
        if (this.quizzes && this.quizzes.length > 0) {
            const choiceOptionsElement = document.getElementById('choice-options');

            this.quizzes.forEach(quiz => {
                const that = this;
                const choiceOptionElement = document.createElement('div');
                choiceOptionElement.className = 'choice-option';
                choiceOptionElement.setAttribute('data-id', quiz.id);
                choiceOptionElement.onclick = function () {
                    that.choiceQuiz(this);
                }

                const choiceOptionTextElement = document.createElement('div');
                choiceOptionTextElement.className = 'choice-option-text';
                choiceOptionTextElement.innerText = quiz.name;

                const choiceOptionArrowElement = document.createElement('div');
                choiceOptionArrowElement.className = 'choice-option-arrow';

                const choiceOptionImageElement = document.createElement('img');
                choiceOptionImageElement.setAttribute('src', 'images/arrow.png');
                choiceOptionImageElement.setAttribute('alt', 'arrow.png');

                choiceOptionArrowElement.appendChild(choiceOptionImageElement);
                choiceOptionElement.appendChild(choiceOptionTextElement);
                choiceOptionElement.appendChild(choiceOptionArrowElement);
                choiceOptionsElement.appendChild(choiceOptionElement);

            })
        }
    }

    choiceQuiz(element) {
        const dataId = element.getAttribute('data-id');
        if (dataId) {
            let userTest = {
                testId: dataId,
            };
            if (sessionStorage.getItem('userTest')) {
                sessionStorage.removeItem('userTest')
            }
            sessionStorage.setItem("userTest", JSON.stringify(userTest))
            location.href = '#/test?name=' + this.routesParam.name
                + '&lastName=' + this.routesParam.lastName + '&email='
                + this.routesParam.email + '&id=' + dataId;
        }
    }
}

