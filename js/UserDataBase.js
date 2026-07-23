class UserDataBase {
    constructor() {
        this.key = "users";
    }

    getAllUsers() {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : [];
    }

    save(allUsers) {
        localStorage.setItem(this.key, JSON.stringify(allUsers));
    }

    getUser(username, password) {
        const users = this.getAllUsers();

        const user = users.find(u => u.username === username);

        if (!user) return "User not found";
        if (user.password !== password) return "Invalid credentials";

        return user;
    }

    addUser(user) {
        const users = this.getAllUsers();

        if (users.some(u => u.username === user.username)) {
            return "User already exists";
        }

        users.push(user);
        this.save(users);

        return true;
    }
}