document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', logIn);

    const signupForm = document.getElementById('signup-form');
    if (signupForm) signupForm.addEventListener('submit', signUp);

    const goToSignupBtn = document.getElementById('go-to-signup');
    if (goToSignupBtn) goToSignupBtn.addEventListener('click', () => showScreen('signup-screen'));

    const goToLoginBtn = document.getElementById('go-to-login');
    if (goToLoginBtn) goToLoginBtn.addEventListener('click', () => showScreen('login-screen'));

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            appState.currentUser = null;
            appState.isLoggedIn = false;
            document.getElementById('login-form').reset();
            document.getElementById('signup-form').reset();
            showScreen('login-screen');
        });
    }
});


function handleSuccessfulLogin(username) {
    appState.currentUser = username;
    appState.isLoggedIn = true;
    document.getElementById('welcome-user').textContent = `Hello, ${username}`;
    showScreen('todo-screen');
    loadInitialTasks(username);
    localStorage.setItem('loggedUser', username);
}

function logIn(e) {
    e.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!username || !password) return alert("Please fill in all fields!");

    const newUser = { username, password };

    sendAjaxRequest(
        "POST",
        "api/UserServer/logIn",
        newUser,
        () => {
            document.getElementById('login-form').reset();
            handleSuccessfulLogin(username);
        },
        (errorMsg) => alert(errorMsg)
    );
}
function signUp(e) {
    e.preventDefault();

    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    if (!username || !password) return alert("Please fill in all fields!");

    const newUser = { username, password };
    sendAjaxRequest(
        "POST",
        "api/UserServer/signUp",
        { username, password },
        () => {
            alert("Successfully registered!");
            document.getElementById('signup-form').reset();
            handleSuccessfulLogin(username);
        },
        err => alert(err)
    );
}