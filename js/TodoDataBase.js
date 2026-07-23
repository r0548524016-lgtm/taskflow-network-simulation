class TodoDataBase {
    constructor() {
        this._StorageKey = "ToDo";
    }

    getTasks(username) {
        if (!username) {
            return "Validation Error: Username is required to fetch tasks.";
        }

        const data = localStorage.getItem(this._StorageKey + username);
        return data ? JSON.parse(data) : [];
    }

    _saveTasks(username, tasks) {
        if (!username) {
            return "Validation Error: Username is required to save tasks.";
        }

        localStorage.setItem(this._StorageKey + username, JSON.stringify(tasks));
    }

    addTask(username, taskData) {
        if (!taskData || !taskData.name || !taskData.name.trim() || !taskData.dueDate) {
            return "Validation Error: Cannot add task. Task Name and Due Date are required.";
        }

        const tasks = this.getTasks(username);

        const newTask = new TodoItem(
            taskData.name.trim(),
            taskData.dueDate,
            taskData.description ? taskData.description.trim() : ""
        );

        newTask.id = String(Date.now());

        tasks.push(newTask);

        this._saveTasks(username, tasks);

        return newTask;
    }

    updateTask(username, taskId, updatedData) {
        if (!taskId) {
            return "Validation Error: Cannot update task. Task ID is missing.";
        }

        if (!updatedData || !updatedData.name || !updatedData.name.trim() || !updatedData.dueDate) {
            return "Validation Error: Cannot update task. Updated Name and Due Date are required.";
        }

        const tasks = this.getTasks(username);

        const index = tasks.findIndex(
            task => String(task.id) === String(taskId)
        );

        if (index === -1) {
            return `Data Error: Task with ID ${taskId} was not found for user ${username}.`;
        }

        updatedData.id = String(taskId);

        tasks[index] = updatedData;

        this._saveTasks(username, tasks);

        return tasks[index];
    }

    deleteTask(username, taskId) {
        if (!taskId) {
            return "Validation Error: Cannot delete task. Task ID is missing.";
        }

        const tasks = this.getTasks(username);

        const filteredTasks = tasks.filter(
            task => String(task.id) !== String(taskId)
        );

        if (tasks.length === filteredTasks.length) {
            return `Data Error: Task with ID ${taskId} does not exist.`;
        }

        this._saveTasks(username, filteredTasks);

        return true;
    }
}