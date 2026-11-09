// Display current date
const today = new Date();

document.getElementById("currentDate").textContent =
    today.toDateString();

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Display tasks
function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
   tasks.forEach((task, index) => {
    if (currentFilter === "pending" && task.completed) return;
    if (currentFilter === "completed" && !task.completed) return;
        const taskItem = document.createElement("div");
        taskItem.className = "task-item d-flex justify-content-between align-items-center";

        const taskName = document.createElement("span");
        taskName.textContent = task.text;
        const taskDate = document.createElement("small");
taskDate.textContent = "Added on: " + (task.date || "Date not available");
taskDate.className = "text-muted d-block mt-1";

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.className = "btn btn-success btn-sm";

        completeBtn.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        };
        // Edit Button
const editBtn = document.createElement("button");
editBtn.textContent = "Edit";
editBtn.className = "btn btn-warning btn-sm me-2";

editBtn.onclick = function () {
    const updatedText = prompt("Edit your task:", task.text);

    if (updatedText !== null && updatedText.trim() !== "") {
        tasks[index].text = updatedText.trim();
        saveTasks();
    }
};

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn btn-danger btn-sm ms-2";

        deleteBtn.onclick = function () {
            tasks.splice(index, 1);
            saveTasks();
        };

        const buttonGroup = document.createElement("div");
        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(completeBtn);
        buttonGroup.appendChild(deleteBtn);

       const taskInfo = document.createElement("div");

taskInfo.appendChild(taskName);
taskInfo.appendChild(taskDate);

taskItem.appendChild(taskInfo);
        taskItem.appendChild(buttonGroup);

        taskList.appendChild(taskItem);
    });
}

// Save tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Add task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
    text: taskText,
    completed: false,
    date: new Date().toLocaleDateString("en-GB")
});

    saveTasks();
    taskInput.value = "";
}
// Filter Tasks
function filterTasks(filter) {
    currentFilter = filter;
    displayTasks();
}

// Show saved tasks when page loads
displayTasks();