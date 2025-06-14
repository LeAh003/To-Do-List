let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const input = document.querySelector('.enter-item');
const todoList = document.getElementById('todo-list');
const completedList = document.getElementById('completed-list');
const clearButton = document.getElementById('clear-completed');

// Render tasks from localStorage
function renderTasks() {
  todoList.innerHTML = '';
  completedList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(task.text));

    if (task.completed) {
      li.classList.add('completed');
      completedList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }

    // Handle checkbox toggle
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });
  });
}

// Add new task on Enter
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && input.value.trim() !== '') {
    const newTask = {
      text: input.value.trim(),
      completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();

    input.value = '';
  }
});

// Clear all completed tasks
clearButton.addEventListener('click', () => {
  if (confirm("Clear all completed tasks?")) {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
  }
});

// Load tasks on page load
renderTasks();
