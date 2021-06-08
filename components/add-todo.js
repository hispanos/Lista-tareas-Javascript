import Alert from './alert.js';
export default class AddToDo {

    constructor() {
        this.btn = document.getElementById('add');
        this.title = document.getElementById('title');
        this.description = document.getElementById('description');
        this.alert = new Alert('alert');
    }

    onClick(callback) {
        this.btn.addEventListener('click', () => {
            if (this.title.value === '' || this.description.value === '') {
                this.alert.show('Debe completar los campos');
            } else {
                this.alert.hide();
                const todo = {
                    title: this.title.value,
                    description: this.description.value
                }
                callback(todo);
            }
        });
    }

}