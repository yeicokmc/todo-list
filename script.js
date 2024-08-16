const tasksContainers = document.querySelector("#task-container");
const addTaskBtn = document.querySelector("#task-ask-btn");

addTaskBtn.addEventListener("click", function (e) {
  const task = document.querySelector("#task").value;
  console.log(task);
  if (task === "") {
    alert("por favor escribe un task");
    return;
  }

  const html = `<li class="task-container">
<div class="task">
  <p class="task-description">${task}</p>
  <div class="task-controls">
    <button class="edit-btn">
      <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="delete-btn">
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>
</div>
</li>`;

  tasksContainers.insertAdjacentHTML("beforeend", html);
  document.querySelector("#task").value = "";
});
