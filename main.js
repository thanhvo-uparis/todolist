const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const addBtn = $(".add-btn");
const addTask = $("#addTaskModal");
const submit = $(".btn-submit");
const modalClose = $(".modal-close");
const btnCancel = $(".btn-cancel");
const todoForm = $(".todo-app-form");

function closeForm() {
    addTask.className = "modal-overlay";
}
modalClose.onclick = closeForm;
btnCancel.onclick = closeForm;

addBtn.onclick = function() {
    addTask.className = "modal-overlay show";
}

const tasks = [];
todoForm.onsubmit = function(e) {
    e.preventDefault();
    const newTask = Object.fromEntries(new FormData(todoForm));
    newTask.isCompleted = true;
    tasks.unshift(newTask);
    renderTask(tasks);
}

function renderTask(tasks) {
    const html = tasks.map(task => `
        <div class="task-card ${task.color} ${task.isCompleted ? "completed" : ""}">
    <div class="task-header">
        <h3 class="task-title">${task.title}</h3>
        <button class="task-menu">
            <i class="fa-solid fa-ellipsis fa-icon"></i>
            <div class="dropdown-menu">
                <div class="dropdown-item">
                    <i class="fa-solid fa-pen-to-square fa-icon"></i>
                    Edit
                </div>
                <div class="dropdown-item ">
                    <i class="fa-solid fa-check fa-icon"></i>
                    ${task.isCompleted ? " Mark as Active" : " Mark as Completed"}
                </div>
                <div class="dropdown-item delete">
                    <i class="fa-solid fa-trash fa-icon"></i>
                    Delete
                </div>
            </div>
        </button>
    </div>
    <p class="task-description">${task.description}</p>
    <div class="task-time">${task.startTime} - ${task.endTime}</div>
</div>
        
        `).join("");
    const todoList = $("#todoList");
    todoList.innerHTML = html;  
}