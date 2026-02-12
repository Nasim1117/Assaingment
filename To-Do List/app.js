const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTask");
const list = document.getElementById("list");

const totalEl = document.getElementById("totalNum");
const doneEl = document.getElementById("doneNum");
const leftEl = document.getElementById("leftNum");

const filters = document.querySelectorAll(".filter");
const clearDone = document.getElementById("clearDone");
const clearAll = document.getElementById("clearAll");

function updateStats() {
    const tasks = list.querySelectorAll("li:not(.empty)");
    const completed = list.querySelectorAll("li.completed");

    totalEl.textContent = tasks.length;
    doneEl.textContent = completed.length;
    leftEl.textContent = tasks.length - completed.length;

    const emptyMsg = list.querySelector(".empty");
    emptyMsg.style.display = tasks.length === 0 ? "block" : "none";
}

addBtn.onclick = () => {
    const text = input.value.trim();
    if (!text) return alert("Please enter a task");

    const li = document.createElement("li");

    li.innerHTML = `
        <span class="text">${text}</span>
        <button class="delete">Delete</button>
    `;

    list.appendChild(li);
    input.value = "";
    updateStats();
};

input.addEventListener("keydown", e => {
    if (e.key === "Enter") addBtn.click();
});

list.addEventListener("click", e => {
    if (e.target.classList.contains("text")) {
        e.target.parentElement.classList.toggle("completed");
        updateStats();
    }

    if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        updateStats();
    }
});

list.addEventListener("dblclick", e => {
    if (!e.target.classList.contains("text")) return;

    const span = e.target;
    const inputEdit = document.createElement("input");
    inputEdit.value = span.textContent;
    inputEdit.className = "edit";

    span.replaceWith(inputEdit);
    inputEdit.focus();

    function save() {
        if (inputEdit.value.trim()) {
            span.textContent = inputEdit.value;
        }
        inputEdit.replaceWith(span);
    }

    inputEdit.addEventListener("blur", save);
    inputEdit.addEventListener("keydown", e => {
        if (e.key === "Enter") save();
    });
});

filters.forEach(btn => {
    btn.onclick = () => {
        filters.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const type = btn.dataset.type;
        const tasks = list.querySelectorAll("li:not(.empty)");

        tasks.forEach(task => {
            task.classList.remove("hidden");

            if (type === "active" && task.classList.contains("completed")) {
                task.classList.add("hidden");
            }
            if (type === "done" && !task.classList.contains("completed")) {
                task.classList.add("hidden");
            }
        });
    };
});

clearDone.onclick = () => {
    list.querySelectorAll(".completed").forEach(task => task.remove());
    updateStats();
};

clearAll.onclick = () => {
    list.querySelectorAll("li:not(.empty)").forEach(task => task.remove());
    updateStats();
};
