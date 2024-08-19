const tasksContainers = document.querySelector("#task-container");
const addTaskBtn = document.querySelector("#task-ask-btn");
const taskEditModal = document.querySelector(".task-edit-modal");
const taskEditBtn = document.querySelector("#task-edit-btn");
const taskEditBtnClosev = document.querySelector("#task-edit-btn-close");

//taskEditModal.showModal();

//AGREGAR TODO
addTaskBtn.addEventListener("click", function (e) {
  const task = document.querySelector("#task").value;
  console.log(task);
  if (task === "") {
    alert("por favor escribe un task");
    return;
  }
  const id = createId();
  const html = createTaskItem(task, id);

  tasksContainers.insertAdjacentHTML("beforeend", html);
  document.querySelector("#task").value = "";
});

//EDITAR TO-DO CON (EVEN DELEGATION)

tasksContainers.addEventListener("click", function (e) {
  const target = e.target;
  const li = target.closest("li");
  if ((target.dataset, edit)) {
    //  taskEditModal.showModal();
    // taskEditModal.dataset.taskId = target.dataset.edit;
    const newTask = prompt("escribe tu todo");
    if (!newTask) return;

    const p = li.querySelector(".task-description");
    p.textContent = newTask;
  }
});

//helper functions
function createTaskItem(task, id) {
  return `
  <li class="task-container">
<div class="task">
  <p class="task-description">${task}</p>
  <div class="task-controls">
    <button class="edit-btn">
      <i class="fa-solid fa-pen-to-square" data-edit=${id}></i>
    </button>
    <button class="delete-btn">
      <i class="fa-solid fa-trash" data-delete=${id}></i>
    </button>
  </div>
</div>
</li>`;
}

function createId() {
  return Math.floor(Math.random() * 50000);
}
