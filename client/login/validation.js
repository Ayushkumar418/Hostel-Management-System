// Simulated user database
const users = [
    { username: 'admin', password: 'admin123', email: 'admin@example.com' }
];

function validateLogin(event) {
    event.preventDefault();
    let isValid = true;
    
    const username = document.getElementById('loginUsername');
    const password = document.getElementById('loginPassword');
    
    resetErrors();

    // Validation
    if (username.value.trim().length < 3) {
        showError('loginUsernameError', 'Username must be at least 3 characters');
        isValid = false;
    }
    
    if (password.value.trim().length < 6) {
        showError('loginPasswordError', 'Password must be at least 6 characters');
        isValid = false;
    }

    // Authentication
    if (isValid) {
        const user = users.find(u => u.username === username.value.trim() && 
                                   u.password === password.value.trim());
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = '../main.html';
        } else {
            showError('loginPasswordError', 'Invalid username or password');
            isValid = false;
        }
    }

    return false;
}

function validateSignup(event) {
    event.preventDefault();
    let isValid = true;

    const username = document.getElementById('signupUsername');
    const email = document.getElementById('signupEmail');
    const password = document.getElementById('signupPassword');

    resetErrors();

    // Validation
    if (username.value.trim().length < 3) {
        showError('signupUsernameError', 'Username must be at least 3 characters');
        isValid = false;
    }

    if (!isValidEmail(email.value.trim())) {
        showError('signupEmailError', 'Please enter a valid email address');
        isValid = false;
    }

    if (password.value.trim().length < 6) {
        showError('signupPasswordError', 'Password must be at least 6 characters');
        isValid = false;
    }

    // Check if username already exists
    if (users.some(u => u.username === username.value.trim())) {
        showError('signupUsernameError', 'Username already exists');
        isValid = false;
    }

    // Register new user
    if (isValid) {
        const newUser = {
            username: username.value.trim(),
            email: email.value.trim(),
            password: password.value.trim()
        };
        users.push(newUser);
        alert('Registration successful! Please login.');
        container.classList.remove("sign-up-mode");
    }

    return false;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function resetErrors() {
    const errors = document.getElementsByClassName('error-text');
    for (let error of errors) {
        error.textContent = '';
        error.style.display = 'none';
    }
}
