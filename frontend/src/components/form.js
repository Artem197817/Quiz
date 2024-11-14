import {CustomHttp} from "../services/custom-http.js";

export class Form {

    constructor(page) {
        this.elementAgree = null,
            this.processElement = null,
            this.page = page,

            this.fields = [

                {
                    name: 'email',
                    id: 'email',
                    element: null,
                    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    valid: false,
                },
                {
                    name: 'password',
                    id: 'password',
                    element: null,
                    regex: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                    valid: false,
                },
            ]

        if (this.page === 'signUp') {
            this.fields.unshift(
                {
                    name: 'name',
                    id: 'name',
                    element: null,
                    regex: /^[A-Za-zА-Яа-яЁё\s]+$/,
                    valid: false,
                },
                {
                    name: 'lastName',
                    id: 'last-name',
                    element: null,
                    regex: /^[A-Za-zА-Яа-яЁё\s]+$/,
                    valid: false,
                },
            )
        }


        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
            }
        })
        this.processElement = document.getElementById('process')
        this.processElement.onclick = function () {
            that.processForm()
        }

        if (this.page === 'signUp') {
            this.elementAgree = document.getElementById('agree');
            this.elementAgree.onchange = function () {
                that.validateForm();
            }
        }


    }


    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.parentNode.style.borderColor = 'red';
            field.valid = false;
        } else {
            element.parentNode.removeAttribute('style');
            field.valid = true;
        }
        this.validateForm();
    }

    validateForm() {
        const validForm = this.fields.every(item => item.valid);
        const isValid = this.elementAgree? this.elementAgree.checked && validForm:  validForm;
        if (isValid) {
            this.processElement.removeAttribute('disabled');
        } else {
            this.processElement.setAttribute('disabled', 'disabled');
        }
        return isValid;
    }

   async processForm() {
        if (this.validateForm) {

            if (this.page === 'signUp'){
                try{
                    const result = await CustomHttp.request('http://localhost:3003/api/signup', 'POST',
                        {
                            name: this.fields.find(item => item.name === 'name').element.value,
                            lastName: this.fields.find(item => item.name === 'lastName').element.value,
                            email: this.fields.find(item => item.name === 'email').element.value,
                            password: this.fields.find(item => item.name === 'password').element.value,
                        });

    
                    if(result){
                        if(result.error || !result.user){
                            throw new Error(result.message);
                        }
                        location.href = '#/choice';
                    }    

                }catch(error){
                        console.log(error);
                }

            }else{

            }

        }
    }

}
