// URL de tu Backend (Host:3000 -> Container:3000)
// ¡IMPORTANTE! Se usa 3000 y el prefijo de ruta '/api/auth'
const API_URL = 'http://localhost:3000/api/auth'; 

// Elementos DOM 
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const messageElement = document.getElementById('message');
const authFormsContainer = document.getElementById('auth-forms');

// NUEVOS ELEMENTOS DEL DASHBOARD
const dashboardScreen = document.getElementById('dashboard-screen');
const welcomeTitle = document.getElementById('welcome-title');
const logoutButtonDashboard = document.getElementById('logout-button-dashboard');

// ELEMENTOS DE SELECCIÓN INICIAL
const selectionScreen = document.getElementById('selection-screen');
const startLoginButton = document.getElementById('startLogin');
const startRegisterButton = document.getElementById('startRegister');


// ----------------------------------------------------
// FUNCIONES DE UTILIDAD
// ----------------------------------------------------

// Muestra el mensaje de feedback
function displayMessage(msg, isError = false) {
    messageElement.textContent = msg;
    // Aplicamos los estilos CSS definidos en style.css (clases error/success)
    messageElement.className = isError ? 'message error' : 'message success';
    messageElement.classList.remove('hidden');
}

// Oculta el mensaje
function clearMessage() {
    messageElement.textContent = '';
    messageElement.className = 'message';
    messageElement.classList.add('hidden');
}

// Oculta todo lo principal
function hideAllScreens() {
    selectionScreen.classList.add('hidden');
    authFormsContainer.classList.add('hidden');
    dashboardScreen.classList.add('hidden');
    clearMessage();
}

// Alterna la vista entre Login y Register
function toggleForm(showFormId) {
    hideAllScreens(); // Oculta todas las demás vistas
    
    // Muestra el contenedor de formularios
    authFormsContainer.classList.remove('hidden'); 
    
    // Alterna los formularios específicos
    loginForm.classList.toggle('hidden', showFormId === 'registerForm');
    registerForm.classList.toggle('hidden', showFormId === 'loginForm');
}

// Muestra la vista principal (después de login) - AHORA MANEJADA EN EL FRONTEND
function handleLoginSuccess(username) {
    displayMessage('✅ ¡Inicio de sesión exitoso!', false);
    
    hideAllScreens();
    dashboardScreen.classList.remove('hidden');
    welcomeTitle.textContent = `Bienvenido, ${username}!`; // Personaliza el mensaje
}

// Muestra la pantalla de selección inicial
function showSelectionScreen() {
    hideAllScreens(); // Oculta todo
    selectionScreen.classList.remove('hidden'); // Muestra solo la selección
}


// ----------------------------------------------------
// MANEJADORES DE EVENTOS DE INTERFAZ
// ----------------------------------------------------

// NUEVOS MANEJADORES PARA LA PANTALLA INICIAL
startLoginButton.addEventListener('click', () => {
    toggleForm('loginForm');
});

startRegisterButton.addEventListener('click', () => {
    toggleForm('registerForm');
});


// Manejar el cambio a formulario de registro (desde Login)
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForm('registerForm');
});

// Manejar el cambio a formulario de login (desde Register)
showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForm('loginForm');
});

// Manejar el cierre de sesión (desde el dashboard)
logoutButtonDashboard.addEventListener('click', (e) => {
    e.preventDefault();
    // Vuelve a la pantalla de selección
    showSelectionScreen();
    displayMessage("Sesión cerrada correctamente.", false);
});


// ----------------------------------------------------
// SUBMISSION: REGISTRO
// ----------------------------------------------------
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessage();

    // IDs corregidos según frontend/index.html
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Usa 'msg' de la respuesta del backend
            displayMessage(data.msg, false);
            toggleForm('loginForm'); // Vuelve al login
        } else {
            // Error 400 (ej. usuario ya registrado)
            displayMessage(data.msg || 'Error desconocido al registrar.', true);
        }

    } catch (error) {
        console.error('Error de red durante el registro:', error);
        displayMessage('Error de conexión con el servidor. Verifica que el backend esté activo en :3000', true);
    }
});


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessage();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    displayMessage('Verificando credenciales...', false); 

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            handleLoginSuccess(data.user.username);
        } else {
            displayMessage('❌ Error: ' + data.msg, true);
        }

    } catch (error) {
        console.error('Error de red:', error);
        displayMessage('🚨 Error de conexión. El backend debe estar corriendo en http://localhost:3000.', true);
    }
});

showSelectionScreen();