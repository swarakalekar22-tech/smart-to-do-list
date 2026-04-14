let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 🔹 Render tasks
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.onchange = () => {
      tasks[index].done = checkbox.checked;
      saveTasks();
    };

    // Text
    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.done) {
      span.classList.add("completed");
    }

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

// 🔹 Add task (THIS was missing properly)
function addTask() {
  const input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    done: false
  });

  input.value = "";
  saveTasks();
}

// 🔹 Save + refresh
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Initial load
renderTasks();