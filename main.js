const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const addBtn = $(".add-btn");
const modalopen = $("#addTaskModal");
const modalBtn = $(".modal-title");
const modalClose = $(".modal-close");
const btnCancel = $(".btn-cancel");
const todoForm = $(".todo-app-form");
const todoList = $("#todoList");
const titleInput = document.getElementById("taskTitle");

function openForm() {
    modalopen.className += " show";
    setTimeout(() => {
        titleInput.focus();
    }, 100);
}
function closeForm() {
    modalopen.className = "modal-overlay";
}

addBtn.onclick = openForm;
modalClose.onclick = closeForm;
btnCancel.onclick = closeForm;

const tasks = []; 

todoForm.onsubmit = function(e) {
    e.preventDefault();
    const newTask = Object.fromEntries(new FormData(todoForm));
    newTask.isCompleted = false;
    tasks.unshift(newTask);
    closeForm();
    renderTasks(tasks);
}


function renderTasks(tasks) {
    const html = tasks.map(task => `
         <div class="task-card ${task.cardColor} ${task.isCompleted ? "completed" : ""}">
            <div class="task-header">
                <h3 class="task-title">${task.title}</h3>
                <button class="task-menu">
                    <i class="fa-solid fa-ellipsis fa-icon"></i>
                    <div class="dropdown-menu">
                        <div class="dropdown-item">
                            <i class="fa-solid fa-pen-to-square fa-icon"></i>
                            Edit
                        </div>
                        <div class="dropdown-item complete">
                            <i class="fa-solid fa-check fa-icon"></i>
                            Mark as Active
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

    todoList.innerHTML = html;
}