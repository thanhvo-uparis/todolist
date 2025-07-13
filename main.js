const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const addBtn = $(".add-btn");
const modalopen = $("#addTaskModal");
const modalClose = $(".modal-close");
const btnCancel = $(".btn-cancel");
const todoForm = $(".todo-app-form");
const todoList = $("#todoList");
const titleInput = document.getElementById("taskTitle");
const editBouttons = $$(".edit-btn");
const modalTitle = $(".modal-title");
const btnActionForm = $(".btn-action");

function openForm(isEdit=false, indexFiled=null) {
    modalopen.className += " show";
    modalTitle.textContent = isEdit ? "Edit Task" : "Add New Task";
    btnActionForm.textContent = isEdit ? "Save Task" : "Submit";
    if (isEdit && (indexFiled !== null)) {
        loadTaskToForm(indexFiled);
    } else {todoForm.reset();} 
    setTimeout(() => {
        titleInput.focus();
    }, 100);
}

function closeForm() {
    modalopen.className = "modal-overlay";
    todoForm.reset();
}

addBtn.onclick = () => openForm(false);
modalClose.onclick = closeForm;
btnCancel.onclick = closeForm;

const tasks = JSON.parse(localStorage.getItem("todoTasks")) ?? [];

todoForm.onsubmit = function(e) {
    e.preventDefault();
    const newTask = Object.fromEntries(new FormData(todoForm));
    newTask.isCompleted = false;
    tasks.push(newTask);
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
    closeForm();
    renderTasks(tasks);
}

function renderTasks(tasks) {
    if (!tasks.length) {
        todoList.innerHTML = `
            <p>There are no tasks yet. Add New Task!</p>
        `
        return;
    }
    const html = tasks.map((task, index) => `
         <div class="task-card ${escapeHTML(task.cardColor)} ${task.isCompleted ? "completed" : ""}">
            <div class="task-header">
                <h3 class="task-title">${escapeHTML(task.title)}</h3>
                <button class="task-menu">
                    <i class="fa-solid fa-ellipsis fa-icon"></i>
                    <div class="dropdown-menu">
                        <div class="dropdown-item edit-btn" data-index="${index}">
                            <i class="fa-solid fa-pen-to-square fa-icon"></i>
                            Edit
                        </div>
                        <div class="dropdown-item complete">
                            <i class="fa-solid fa-check fa-icon"></i>
                            ${task.isCompleted ? "Mark as Active" : "Mark as Complete"}
                        </div>
                        <div class="dropdown-item delete">
                            <i class="fa-solid fa-trash fa-icon"></i>
                            Delete
                        </div>
                    </div>
                </button>
            </div>
            <p class="task-description">${escapeHTML(task.description)}</p>
            <div class="task-time">${escapeHTML(task.startTime)} - ${escapeHTML(task.endTime)}</div>
        </div>
       `).join("");

    todoList.innerHTML = html;
}
renderTasks(tasks);

//EDIT
todoList.onclick = function(event) {
    const elementSelected = event.target.closest(".edit-btn");
    if (elementSelected) {
        const index = elementSelected.dataset.index;
        openForm(true, index);
    }
}

function loadTaskToForm(index) {
    const task = tasks[index];
    for (const key in task) {
        const value = task[key];
        // const field = todoForm.elements[key];
        const field = $(`[name=${key}]`);
        if (field) {
            field.value = value;
        }
    }
    
}

function escapeHTML(html) {
    const div = document.createElement("div");
    div.textContent = html;
    return div.innerHTML;
}