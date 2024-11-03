import {Form} from "./components/form.js";
import {Choice} from "./components/choice.js";
import {Test} from "./components/test.js";
import {Result} from "./components/result.js";
import {Answer} from "./components/answer.js";

export class Router{
    constructor(){
        this.routes=[
            {
                routes: '#/',
                title: 'Главная',
                template: 'templates/index.html',
                styles: 'styles/index.css',
                load: () =>{}
            },
            {
                routes: '#/form',
                title: 'Регистрация',
                template: 'templates/form.html',
                styles: 'styles/form.css',
                load: () =>{
                    new Form();
                }
            },
            {
                routes: '#/choice',
                title: 'Выбор теста',
                template: 'templates/choice.html',
                styles: 'styles/choice.css',
                load: () =>{
                    new Choice();
                }
            },
            {
                routes: '#/test',
                title: 'Тест',
                template: 'templates/test.html',
                styles: 'styles/test.css',
                load: () =>{
                    new Test();
                }
            },
            {
                routes: '#/result',
                title: 'Результаты теста',
                template: 'templates/result.html',
                styles: 'styles/result.css',
                load: () =>{
                    new Result();
                }
            },
            {
                routes: '#/answer',
                title: 'Ответы',
                template: 'templates/answer.html',
                styles: 'styles/answer.css',
                load: () =>{
                    new Answer();
                }
            },
        ];
    }
async openRoute(){
    const newRoute = this.routes.find(item =>{
        return item.routes === window.location.hash.split('?')[0];
    })
    if(!newRoute){
    window.location.href = "#/";
    return
    }
    document.getElementById('content').innerHTML = await fetch(newRoute.template)
        .then(response => response.text());
    document.getElementById('styles')
        .setAttribute('href', newRoute.styles);
    document.getElementById('page-title').innerText = newRoute.title;
    newRoute.load();
}
}