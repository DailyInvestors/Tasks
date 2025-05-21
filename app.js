const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = [];

// Load todos from localStorage on startup
function loadTodos() {
  const stored = localStorage.getItem('todos');
  todos = stored ? JSON.parse(stored) : [];
}

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Render todos to the DOM
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    // Toggle complete on span click
    const span = document.createElement('span');
    span.textContent = todo.text;
    span.onclick = () => toggleTodo(idx);

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => deleteTodo(idx);

    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

// Add a new todo
function addTodo(e) {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
    todoInput.value = '';
  }
}

// Toggle completion state
function toggleTodo(idx) {
  todos[idx].completed = !todos[idx].completed;
  saveTodos();
  renderTodos();
}

// Delete a todo
function deleteTodo(idx) {
  todos.splice(idx, 1);
  saveTodos();
  renderTodos();
}

// Initial setup
todoForm.addEventListener('submit', addTodo);
loadTodos();
renderTodos();
