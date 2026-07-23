let currentTasks = [];

function getUsername() {
    return appState?.currentUser;
}

function setTasks(newTasks) {
    currentTasks = newTasks;
    renderTasks(currentTasks);
}

function updateTasks(updater) {
    setTasks(updater(currentTasks));
}

function loadInitialTasks(username) {
    if (!username) return;

    sendAjaxRequest(
        "GET",
        "api/ListServer/" + username,
        null,
        (responseText) => {
            try {
                const parsed = JSON.parse(responseText);
                setTasks(Array.isArray(parsed) ? parsed : []);
            } catch (e) {
                console.error(e);
                setTasks([]);
            }
        },
        () => setTasks([])
    );
}

function createTodoCard(e) {
    e?.preventDefault();

    const username = getUsername();
    if (!username) return alert("You must be logged in");

    const name = document.getElementById('task-name').value.trim();
    const dueDate = document.getElementById('task-date').value;
    const description = document.getElementById('task-desc').value.trim();

    if (!name || !dueDate) return alert("Missing fields");

    sendAjaxRequest(
        "POST",
        "api/ListServer/" + username,
        { name, dueDate, description },
        () => {
            document.getElementById('add-task-form').reset();
            loadInitialTasks(username);
        },
        err => alert(err)
    );
}

function promptUpdateTask(task) {
    const username = getUsername();
    if (!username || !task?.id) return;

    const newName = prompt("Edit Task Name:", task.name);
    if (!newName?.trim()) return;

    const newDate = prompt("Edit Due Date:", task.dueDate);
    if (!newDate?.trim()) return;

    const newDesc = prompt("Edit Description:", task.description);

    const updated = {
        id: task.id,
        name: newName.trim(),
        dueDate: newDate.trim(),
        description: (newDesc || "").trim()
    };

    sendAjaxRequest(
        "PUT",
        "api/ListServer/" + username + "/" + task.id,
        updated,
        () => updateTasks(tasks =>
            tasks.map(t =>
                String(t.id) === String(task.id) ? updated : t
            )
        ),
        err => alert(err)
    );
}

function removeTaskFromServer(taskId, onSuccess, onError) {
    const username = getUsername();
    if (!username || !taskId) return;

    sendAjaxRequest(
        "DELETE",
        "api/ListServer/" + username + "/" + taskId,
        null,
        () => updateTasks(t =>
            t.filter(x => String(x.id) !== String(taskId))
        ),
        err => alert(err)
    );
}

function deleteTask(taskId, taskName) {
    if (!confirm(`Delete "${taskName}"?`)) return;

    removeTaskFromServer(taskId);
}

function completeTask(taskId) {
    confetti?.({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });

    removeTaskFromServer(taskId);
}

function searchTasks(e) {
    e?.preventDefault();

    const input = document.getElementById('search-input');
    const query = input.value.trim().toLowerCase();

    if (!query) return renderTasks(currentTasks);

    const filtered = currentTasks.filter(task =>
        task.name?.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
    );

    renderTasks(filtered);
}

function createTaskCard(task, today) {
    const template = document.getElementById('todo-item-template');
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.todo-item-card');

    clone.querySelector('.template-task-name').textContent = task.name;
    clone.querySelector('.template-task-date').textContent = task.dueDate;
    clone.querySelector('.template-task-desc').textContent = task.description;

    if (task.dueDate) {
        const d = new Date(task.dueDate);
        d.setHours(0, 0, 0, 0);

        if (d < today) {
            card.classList.add('expired-task');
        }
    }

    clone.querySelector('.delete-btn')
        ?.addEventListener('click',
            () => deleteTask(task.id, task.name));

    clone.querySelector('.edit-btn')
        ?.addEventListener('click',
            () => promptUpdateTask(task));

    clone.querySelector('.done-btn')
        ?.addEventListener('click',
            () => completeTask(task.id));

    return clone;
}

function renderTasks(tasks) {
    const list = document.getElementById('todo-items-list');

    list.innerHTML = "";

    if (!tasks.length) {
        list.innerHTML = "<p>No tasks found</p>";
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    tasks.forEach(task => {
        if (!task?.id) return;
        list.appendChild(createTaskCard(task, today));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-task-form')
        ?.addEventListener('submit', createTodoCard);

    document.getElementById('search-form')
        ?.addEventListener('submit', searchTasks);

    const username = getUsername();
    if (username) loadInitialTasks(username);
});