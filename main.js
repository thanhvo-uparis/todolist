const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const addBtn = $(".add-btn");
const modalopen = $("#addTaskModal");
const modalBtn = $(".modal-title");
const modalClose = $(".modal-close");
const btnCancel = $(".btn-cancel");

function openForm() {
    modalopen.className += " show";
}
function closeForm() {
    modalopen.className = "modal-overlay";
}

addBtn.onclick = openForm;
modalClose.onclick = closeForm;
btnCancel.onclick = closeForm;