const appState = {
    currentUser: localStorage.getItem('loggedUser') || null,
    isLoggedIn: localStorage.getItem('loggedUser') ? true : false,
};

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.style.display = 'none');

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (appState.isLoggedIn && appState.currentUser) {
        const welcomeEl = document.getElementById('welcome-user');
        if (welcomeEl) welcomeEl.textContent = `Hello, ${appState.currentUser}`;
        showScreen('todo-screen');
    } else {
        showScreen('login-screen');
    }
});