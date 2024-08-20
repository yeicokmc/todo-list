const tasksContainers = document.querySelector("#task-container");
const form = document.querySelector("#task-input");
const taskEditModal = document.querySelector(".task-edit-modal");
const taskEditBtn = document.querySelector("#task-edit-btn");
const taskEditBtnClosev = document.querySelector("#task-edit-btn-close");
let todosLosTodo = [];

// LOAD TASKS
function loadTasks() {
  todosLosTodo = JSON.parse(localStorage.getItem("tasks"));

  if (todosLosTodo && todosLosTodo.length > 0) {
    const listaDeTodos = todosLosTodo.map((task) =>
      createTaskItem(task.task_description, task.id)
    );
    tasksContainers.insertAdjacentHTML("beforeend", listaDeTodos.join(""));
  }
}
loadTasks();

// AGREGAR TO-DO
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = document.querySelector("#task").value;
  if (!task) {
    alert("Por favor escribe un task");
    return;
  }

  const id = createId();
  const html = createTaskItem(task, id);

  tasksContainers.insertAdjacentHTML("beforeend", html);
  document.querySelector("#task").value = "";

  todosLosTodo.push({
    id: id,
    task_description: task,
  });

  localStorage.setItem("tasks", JSON.stringify(todosLosTodo));
});

//EDITAR TO-DO CON (EVEN DELEGATION)

tasksContainers.addEventListener("click", function (e) {
  const target = e.target;
  const li = target.closest("li");
  if (target.dataset.edit) {
    taskEditModal.showModal();
    taskEditModal.dataset.task_id = target.dataset.edit;
    //const newTask = prompt("escribe tu todo");
    // if (!newTask) return;
    //  const p = li.querySelector(".task-description");
    // p.textContent = newTask;
  }
  if (target.dataset.delete) {
    tasksContainers.removeChild(li);
  }
});

taskEditBtn.addEventListener("click", function (e) {
  const newDescription = document.querySelector("#task-edit").value;
  if (!newDescription) return;

  const taskId = taskEditModal.dataset.task_id;
  todosLosTodo = todosLosTodo.map((task) => 
  if (task.id == taskId))
});
taskEditBtnClosev.addEventListener("click", function (e) {
  taskEditModal.close();
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
