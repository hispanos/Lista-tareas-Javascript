import Alert from "./alert.js";

export default class Modal {

    constructor() {
        this.title = document.getElementById('modal-title');
        this.description = document.getElementById('modal-description');
        this.completed = document.getElementById('modal-completed');
        this.btn = document.getElementById('modal-btn');
        this.alert = new Alert('modal-alert');
        this.todo = null;
    }

    onClick(callback) {
        this.btn.addEventListener('click', () => {
            if (!this.title.value || !this.description.value) {
                this.alert.show('Debe completar los campos');
                return;
            }

            callback(this.todo.id, {
                title: this.title.value,
                description: this.description.value,
                completed: this.completed.checked
            });

            $('#modal').modal('toggle');

        });
    }

    setValues(todo) {
        this.todo = todo;
        this.title.value = todo.title;
        this.description.value = todo.description;
        this.completed.checked = todo.completed;
    }

}