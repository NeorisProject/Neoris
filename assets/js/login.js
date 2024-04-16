// Interactividad de la UI
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Proceso de registro de usuarios
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const data = {
        name: document.querySelector('#signup-form [name="name"]').value,
        email: document.querySelector('#signup-form [name="email"]').value,
        password: document.querySelector('#signup-form [name="password"]').value,
        linkedin: document.querySelector('#signup-form [name="linkedin"]').value,
        fechaNac: document.querySelector('#signup-form [name="fechaNac"]').value,
        empresa: document.querySelector('#signup-form [name="empresa"]').value
    };

    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Procesar la respuesta JSON
    })
    .then(data => {
        if (data.status === 'success') {
            window.location.href = '/login.html'; // Redirigir al usuario al registrarse
        } else {
            alert('Failed to sign up: ' + data.message); // Mostrar mensaje de error
        }
    })
    .catch(error => {
        console.error('Error during the registration:', error);
        alert('Error al registrarse. Por favor, inténtalo de nuevo.'); // Mostrar mensaje de error al usuario
    });
});

// Proceso de inicio de sesión
document.getElementById('signin-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const data = {
        email: document.querySelector('#signin-form [name="email"]').value,
        password: document.querySelector('#signin-form [name="password"]').value
    };

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            window.location.href = '/index.html'; // Redirigir al usuario a la página principal
        } else {
            alert(data.message); // Mostrar mensaje de error
        }
    })
    .catch(error => {
        console.error('Error during the login:', error);
        alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    });
});

