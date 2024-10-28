const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
let tasks = [];

taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = document.getElementById('new-task').value;
    const taskDatetime = document.getElementById('task-datetime').value;
    const task = {
        id: Date.now(),
        text: taskText,
        datetime: taskDatetime,
        completed: false,
    };
    tasks.push(task);
    renderTasks();
    taskForm.reset();
});

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item${task.completed ? ' completed' : ''}`;
        taskItem.innerHTML = `
            <div class="task-details">
                <span>${task.text}</span>
                <small>${new Date(task.datetime).toLocaleString()}</small>
            </div>
            <div class="task-controls">
                <button class="complete" onclick="toggleComplete(${task.id})">Complete</button>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    renderTasks();
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    const newTaskText = prompt('Edit task:', task.text);
    if (newTaskText) {
        task.text = newTaskText;
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
}
