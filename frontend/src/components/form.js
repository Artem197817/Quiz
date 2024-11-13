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

    processForm() {
        if (this.validateForm) {
            let paramString = '';
            let user = {};
            this.fields.forEach(item => {
                paramString += (!paramString ? '?' : '&') + item.name + '=' + item.element.value
                user[item.name] = item.element.value
            });

            if (sessionStorage.getItem('user')) {
                sessionStorage.clear
            }
            sessionStorage.setItem("user", JSON.stringify(user));
            location.href = '#/choice' + paramString;
        }
    }

}

