class TodoServer {
    constructor() {
        this.todoDb = new TodoDataBase();
    }

    processRequest(request) {
        try {
            const method = request.type;
            const urlInfo = this._parseUrl(request.url);
            let data = request.data;
            if (typeof data === "string") {
                data = JSON.parse(data);
            }
            if (!urlInfo.username) {
                return { status: 400, responseText: "Username is required" };
            }

            switch (method) {
                case "GET":
                    return this._handleGet(urlInfo, data);

                case "POST":
                    return this._handlePost(urlInfo, data);

                case "PUT":
                    return this._handlePut(urlInfo, data);

                case "DELETE":
                    return this._handleDelete(urlInfo, data);

                default:
                    return { status: 405, responseText: "Method Not Allowed" };
            }

        } catch (error) {
            return this._handleError(error);
        }
    }

    _parseUrl(url) {
        const urlParts = url.split('?');
        const basePath = urlParts[0];
        const queryString = urlParts[1] || "";
        const segments = basePath.split('/');

        let searchQuery = "";
        const match = queryString.match(/search=([^&]*)/);
        if (match) searchQuery = decodeURIComponent(match[1]);

        return {
            username: segments[2],
            taskId: segments[3],
            searchQuery: searchQuery
        };
    }

    _handleGet(urlInfo) {
        const tasks = this.todoDb.getTasks(urlInfo.username);

        return {
            status: 200,
            responseText: JSON.stringify(tasks)
        };
    }

    _handlePost(urlInfo, data) {
        if (!data) return { status: 400, responseText: "Task data is missing" };

        const taskObj = {
            id: data.id || null,
            name: data.name || "Untitled Task",
            dueDate: data.dueDate || "",
            description: data.description || ""
        };

        const newTask = this.todoDb.addTask(urlInfo.username, taskObj);
        return {
            status: 201,
            responseText: JSON.stringify(newTask)
        };
    }

    _handlePut(urlInfo, data) {
        if (!urlInfo.taskId) {
            return { status: 400, responseText: "Task ID is required for update" };
        }
        if (!data) {
            return { status: 400, responseText: "Update data is missing" };
        }

        const updated = this.todoDb.updateTask(urlInfo.username, urlInfo.taskId, data);
        return {
            status: 200,
            responseText: JSON.stringify(updated)
        };
    }

    _handleDelete(urlInfo) {
        if (!urlInfo.taskId) {
            return { status: 400, responseText: "Task ID is required for deletion" };
        }

        this.todoDb.deleteTask(urlInfo.username, urlInfo.taskId);

        return { status: 200, responseText: "OK" };
    }

    _handleError(error) {
        console.error("Server caught an error:", error.message);
        return { status: 500, responseText: error.message };
    }
}