
    export  class Result{

    constructor() {
        this.userTest = null;
        this.userTest = JSON.parse(sessionStorage.getItem('userTest'));
        console.log(this.userTest);
        this.showResult();
    }

        showResult() {
            document.getElementById('result-scope').innerText =
                this.userTest.result.score + '/' + this.userTest.result.total;
        }

    }
