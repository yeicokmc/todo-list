const tasksContainer = document.querySelector("#tasks-container");
const form = document.querySelector("#task-input");
const taskEditModal = document.querySelector(".task_edit-modal");
const taskEditBtn = document.querySelector("#task_edit-btn");
const taskEditBtnClose = document.querySelector("#task_edit-btn-close");
let todosLosTodos = [];

// LOAD TASKS
function loadTasks() {
  tasksContainer.textContent = "";
  todosLosTodos = JSON.parse(localStorage.getItem("tasks"));

  if (todosLosTodos && todosLosTodos.length > 0) {
    const listaDeTodos = todosLosTodos.map((task) =>
      createTaskItem(task.task_description, task.id)
    );
    tasksContainer.insertAdjacentHTML("beforeend", listaDeTodos.join(""));
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

  tasksContainer.insertAdjacentHTML("beforeend", html);
  document.querySelector("#task").value = "";

  todosLosTodos.push({
    id: id,
    task_description: task,
  });

  localStorage.setItem("tasks", JSON.stringify(todosLosTodos));
});

// EDITAR TO-DO / ELIMINAR TO-DO (event delegation)
tasksContainer.addEventListener("click", function (e) {
  const target = e.target;
  const li = target.closest("li");

  //   Editar
  if (target.dataset.edit) {
    taskEditModal.showModal();
    taskEditModal.dataset.task_id = target.dataset.edit;
    // const newTask = prompt("Escribe tu to-do");
    // if (!newTask) return;

    // const p = li.querySelector(".task-description");
    // p.textContent = newTask;
  }

  //   Eliminar
  if (target.dataset.delete) {
    tasksContainer.removeChild(li);
    const taskId = target.dataset.delete;
    todosLosTodos = todosLosTodos.filter((task) => task.id != taskId);
    localStorage.setItem("tasks", JSON.stringify(todosLosTodos));
  }
});

taskEditBtn.addEventListener("click", function (e) {
  const newDescription = document.querySelector("#task_edit").value;
  if (!newDescription) return;

  const taskId = taskEditModal.dataset.task_id;
  todosLosTodos = todosLosTodos.map((task) => {
    if (task.id == taskId) {
      return {
        id: task.id,
        task_description: newDescription,
      };
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(todosLosTodos));

  taskEditModal.dataset.task_id = "";
  document.querySelector("#task_edit").value = "";
  taskEditModal.close();

  loadTasks();
});

taskEditBtnClose.addEventListener("click", function (e) {
  taskEditModal.close();
});

// HELPER FUNCTIONS
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
    </li>
  `;
}

function createId() {
  return Math.floor(Math.random() * 50000);
}
