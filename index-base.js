document.addEventListener('DOMContentLoaded', function() {

    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const btn = document.getElementById('add');
    const table = document.getElementById('table');
    const alert = document.getElementById('alert');
    let id = 1;

    function addToDo() {
        if (title.value === '' || description.value === '') {
            alert.classList.remove('d-none');
            alert.innerText = 'Requeridos título y descripción';
            return;
        }

        alert.classList.add('d-none');
        const row = table.insertRow();
        row.setAttribute('id', id++);
        row.innerHTML = `
            <td>${title.value}</td>
            <td>${description.value}</td>
            <td class="text-center">
                <input type="checkbox">
            </td>
            <td class="text-right">

            </td>
        `;

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';

        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';

        row.children[3].appendChild(removeBtn);

        removeBtn.addEventListener('click', function() { removeToDo(row.getAttribute('id')) });
    }

    function removeToDo(id) {
        document.getElementById(id).remove();
    }




    btn.addEventListener('click', addToDo);


});

