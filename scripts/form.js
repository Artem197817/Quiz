(function(){
const Form = {
    elementAgree: null,
    processElement: null,
    fields:[
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
        {
            name: 'email',
            id: 'email',
            element: null,
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            valid: false,
        },
    ],

   init(){
    const that = this;
    this.fields.forEach(item => {
        item.element = document.getElementById(item.id);
        item.element.onchange = function(){
            that.validateField.call(that, item, this);
        }
    })
    this.processElement = document.getElementById('process')
    this.processElement.onclick = function(){
        that.processForm()
    }


    this.elementAgree = document.getElementById('agree');
    this.elementAgree.onchange = function(){
        that.validateForm();
    }
    },
    validateField(field, element){
        if(!element.value || !element.value.match(field.regex)){
            element.parentNode.style.borderColor = 'red';
            field.valid = false;
        }else{
            element.parentNode.removeAttribute('style');
            field.valid = true;
        }
        this.validateForm();
    },

    validateForm(){
        const validForm = this.fields.every(item => item.valid);
        const isValid = this.elementAgree.checked && validForm;
        if (isValid){
            this.processElement.removeAttribute('disabled');
        }else{
            this.processElement.setAttribute('disabled', 'disabled');
        }
        return isValid;
    },
    processForm(){
        if(this.validateForm){
            let paramString = '';
            let user = {};
            this.fields.forEach(item => {
                paramString += (!paramString? '?' : '&') + item.name + '=' + item.element.value
                user[item.name] = item.element.value
            });

            if(sessionStorage.getItem('user')){
                sessionStorage.clear
            }
            sessionStorage.setItem("user", JSON.stringify(user));
            location.href = 'choice.html' + paramString;
        }
    }



};


Form.init();
})();