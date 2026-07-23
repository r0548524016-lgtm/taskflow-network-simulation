class UserServer {
    constructor() {
        this.db = new UserDataBase();
    }

    processRequest(myRequest) {
        const url = myRequest.url;
        let data = myRequest.data;

        if (typeof data === "string") {
            data = JSON.parse(data);
        }

        if (!data?.username || !data?.password) {
            return { status: 400, responseText: "Bad Request" };
        }

        let response;
        if (url.includes("/logIn")) {
            const user = this.db.getUser(data.username, data.password);
            
            if (user && typeof user === "object") {
                response = {
                    status: 200,
                    responseText: "OK",
                    data: { username: user.username }
                };
            } else {
                response = { status: 401, responseText: user };
            }
        }

        else if (url.includes("/signUp")) {
            const userObj = new User(data.username, data.password);
            const result = this.db.addUser(userObj);

            if (result === true) {
                response = { status: 201, responseText: "User Created" };
            } else {
                response = { status: 400, responseText: result };
            }
        }

        else {
            response = { status: 404, responseText: "Not Found" };
        }

        return response;
    }

}