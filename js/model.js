export default class Model {

    constructor() {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if (!this.todos || this.todos.length < 1) {
            this.todos = [
                {
                    id: 0,
                    title: 'Demo',
                    description: 'Cualquiera',
                    completed: false
                }
            ];
            this.currentId = 1;
        }else {
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }
        

    }

    setView(view) {
        this.view = view;
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    getTodos() {
        return this.todos;
    }

    findTodo(id) {
        const index = this.todos.findIndex( (todo) => todo.id === id);
        const todo = this.todos[index];
        return todo;
    }

    addTodo(todo) {
        todo.id = this.currentId++;
        todo.completed = false;

        this.todos.push(todo);

        this.save();
        return {...todo};
    }

    removeTodo(id) {
        const index = this.todos.findIndex( (todo) => todo.id === id);
        const todo = this.todos[index];
        this.todos.splice(index, 1)
        this.save();
        return todo;
    }

    toggleCompleted(id) {
        const index = this.todos.findIndex( (todo) => todo.id === id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        this.save();
        return todo;
    }

    editTodo(id, values) {
        const todo = this.findTodo(id);
        // todo.title = values.title;
        // todo.description = values.description;
        // todo.completed = values.completed;
        Object.assign(todo, values)
        this.save();
        return todo;
    }

}