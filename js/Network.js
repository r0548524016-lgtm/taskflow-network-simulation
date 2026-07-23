class Network {
    constructor() {
        this.todoServer = new TodoServer();
        this.userServer = new UserServer();
        this.dropRate = 0.01;

    }

    network(type, url, async, details, callback) {

        const myRequest = {
            type,
            url,
            async,
            data: details
        };

        const delay = 500 + Math.random() * 500;

        if (Math.random() < this.dropRate) {
            setTimeout(() => {
                callback({
                    status: 0,
                    responseText: "Network message dropped"
                });
            }, delay);

            return;
        }
        let response;

        if (url.startsWith('api/ListServer')) {
            response = this.todoServer.processRequest(myRequest);
        }
        else if (url.startsWith('api/UserServer')) {
            response = this.userServer.processRequest(myRequest);
        }
        else {
            response = {
                status: 404,
                responseText: "Server not found"
            };
        }


        setTimeout(() => {
            callback(response);
        }, delay);
    }

}