

let newTodo = document.getElementById('btn');

function saveTodosToLocalStorage() {
    const ul = document.getElementById('todo-items');
    const todosArray = Array.from(ul.children).map(li => li.querySelector('span').textContent);
    localStorage.setItem('todos', JSON.stringify(todosArray));
}; 

function loadTodosFromLocalStorage() {
    const ul = document.getElementById('todo-items');
    const todosArray = JSON.parse(localStorage.getItem('todos') || '[]');
    
    todosArray.forEach(function(todoText) {
        const li = document.createElement('li');
        const todoSpan = document.createElement('span');
        todoSpan.textContent = todoText;

        todoSpan.addEventListener('click', function() {
            todoSpan.style.textDecoration = todoSpan.style.textDecoration === 'line-through' ? 'none' : 'line-through';
        });

        li.appendChild(todoSpan);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            ul.removeChild(li);
            saveTodosToLocalStorage(); // Save the updated list after deletion
        });

        li.appendChild(deleteBtn);

        ul.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', loadTodosFromLocalStorage);

newTodo.addEventListener("click", function addTodo() {
    const input = document.getElementById('new-todo');
    const ul = document.getElementById('todo-items');

    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        const todoSpan = document.createElement('span');
        todoSpan.textContent = input.value;
        
        // Add event listener to the span to cross out todo on click
        todoSpan.addEventListener('click', function() {
            todoSpan.style.textDecoration = todoSpan.style.textDecoration === 'line-through' ? 'none' : 'line-through';
        });

        li.appendChild(todoSpan);

        // Create a delete button for the todo
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            ul.removeChild(li);
        });

        li.appendChild(deleteBtn);
        ul.appendChild(li);
        saveTodosToLocalStorage();

        // Clear the input for the next item
        input.value = '';
    }
})



