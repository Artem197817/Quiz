(function () {
        const Answer = {
            quiz: null,
            rightAnswer: [],
            user: null,
            userTest: null,
            init: function () {
                this.user = JSON.parse(sessionStorage.getItem('user'));
                console.log(this.user)
                this.userTest = JSON.parse(sessionStorage.getItem('userTest'));
                console.log(this.userTest)
                if (this.user && this.userTest) {
                    const xhr = new XMLHttpRequest();
                    xhr.open("GET", 'https://testologia.ru/get-quiz?id=' + this.userTest.testId, false);
                    xhr.send();
                    if (xhr.status === 200 && xhr.responseText) {
                        try {
                            this.quiz = JSON.parse(xhr.responseText);
                        } catch (e) {
                            location.href = 'index.html';
                        }
                    } else {
                        location.href = 'index.html';
                    }
                    xhr.open("GET", 'https://testologia.ru/get-quiz-right?id=' + this.userTest.testId, false);
                    xhr.send();
                    if (xhr.status === 200 && xhr.responseText) {
                        try {
                            this.rightAnswer = JSON.parse(xhr.responseText);
                            console.log(this.rightAnswer)
                        } catch (e) {
                            location.href = 'index.html';
                        }

                    } else {
                        location.href = 'index.html';
                    }
                    this.showInfo();
                    this.showAnswer();

                } else {
                    location.href = 'index.html'
                }
            },
            showInfo: function () {
                document.getElementById('pre-title').innerText = this.quiz.name;
                document.getElementById('tested').innerText = this.user.name + ' '
                    + this.user.lastName + ', ' + this.user.email;

            },
            showAnswer: function () {
                let isValid = false;
                let index = 0;
                let arrUserAnswers = [];
                this.userTest.userAnswer.forEach(function (answer) {
                    arrUserAnswers.push(answer.chosenAnswerId);
                    console.log(answer)
                    console.log(arrUserAnswers)
                })

                const answerBlock = document.getElementById('answer-block');

                this.quiz.questions.forEach(question => {
                    const answerQuestionElement = document.createElement('div');
                    answerQuestionElement.className = 'answer-question';

                    const answerTitleElement = document.createElement('h2');
                    answerTitleElement.className = 'answer-title';
                    answerTitleElement.innerHTML = '<span>Вопрос ' + (index + 1)
                        + ': </span> ' + question.question;

                    const answersElement = document.createElement('div');
                    answersElement.className = 'answer-answers';


                    answerQuestionElement.appendChild(answerTitleElement);

                    question.answers.forEach((answer) => {
                        const answerElement = document.createElement('div');
                        answerElement.className = 'answer-answer';
                        answerElement.innerText = answer.answer;

                        if (answer.id !== this.rightAnswer[index] && answer.id === arrUserAnswers[index]) {
                            answerElement.style.color = '#DC3333';
                            answerElement.classList.add('invalid-answer');
                        } else {
                            if (answer.id === this.rightAnswer[index] && answer.id === arrUserAnswers[index]) {
                                answerElement.style.color = '#5FDC33';
                                answerElement.classList.add('right-answer');
                            }
                        }


                        answersElement.appendChild(answerElement);

                    });

                    answerQuestionElement.appendChild(answersElement);
                    answerBlock.appendChild(answerQuestionElement);
                    index++;
                });

            },
        }


        Answer.init();
    }
)
()