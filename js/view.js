import AddToDo from '../components/add-todo.js';
import Filter from '../components/filters.js';
import Modal from '../components/modal.js';

export default class View {

    constructor() {
        this.model = null;
        this.table = document.getElementById('table');
        this.addTodoForm = new AddToDo();
        this.modal = new Modal();
        this.filters = new Filter();
        
        this.addTodoForm.onClick( (todo) => { this.addTodo(todo)});
        this.modal.onClick( (id, values) => { this.editTodo(id, values) } );
        this.filters.onClick( (filters) => { this.filter(filters) } );
    }

    setModel(model) {
        this.model = model;
    }

    render() {
        const todos = this.model.getTodos();
        todos.forEach( (todo) => {this.createTodo(todo)} )
    }

    filter(filters) {
        const {type, words} = filters;
        const [_, ...rows] = this.table.getElementsByTagName('tr');
        for(const row of rows) {
            const [title, description, completed] = row.children;
            let shouldHide = false;

            if (words) {
                shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
            }

            const shouldBeCompleted = type === 'completed';
            const isCompleted = completed.children[0].checked;

            if (type !== 'all' && shouldBeCompleted !== isCompleted) {
                shouldHide = true;
            }

            if (shouldHide) {
                row.classList.add('d-none');
            }else{
                row.classList.remove('d-none');
            }
            
        }
    }

    addTodo(todo) {
       this.model.addTodo(todo);
       this.createTodo(todo);
    }

    removeTodo(id) {
        document.getElementById(id).remove();
        this.model.removeTodo(id);
    }

    toggleCompleted(id) {
        this.model.toggleCompleted(id);
    }

    editTodo(id, values) {
        this.model.editTodo(id, values);
        const row = document.getElementById(id);
        row.children[0].innerText = values.title;
        row.children[1].innerText = values.description;
        row.children[2].children[0].checked = values.completed;
    }

    createTodo(todo) {
        const row = table.getElementsByTagName('tbody')[0].insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center">
                
            </td>
            <td class="text-right">

            </td>
        `;

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');

        row.children[3].appendChild(editBtn);
        editBtn.addEventListener('click', () => { this.modal.setValues(todo) });

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';

        row.children[3].appendChild(removeBtn);
        removeBtn.addEventListener('click', () => { this.removeTodo(todo.id) });

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;

        row.children[2].appendChild(checkbox);
        checkbox.addEventListener('click', () => { this.toggleCompleted(todo.id) });

    }


}


