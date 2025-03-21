document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Remove error styling on input
    const removeError = (input) => {
        input.classList.remove('input-error');
        const errorMessage = input.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    };

    // Add error styling and message
    const addError = (input, message) => {
        input.classList.add('input-error');
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        input.parentElement.appendChild(errorMessage);
    };

    // Handle input changes
    usernameInput.addEventListener('input', () => removeError(usernameInput));
    passwordInput.addEventListener('input', () => removeError(passwordInput));

    // Form submission handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Clear previous errors
        removeError(usernameInput);
        removeError(passwordInput);

        // Validate username
        if (!usernameInput.value.trim()) {
            addError(usernameInput, 'Username is required');
            isValid = false;
        }

        // Validate password
        if (!passwordInput.value.trim()) {
            addError(passwordInput, 'Password is required');
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            addError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        }

        // If valid, simulate login (for prototype)
        if (isValid) {
            const submitButton = loginForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Signing in...';

            // Simulate API call
            setTimeout(() => {
                // For prototype: redirect to dashboard if username is "admin"
                if (usernameInput.value.toLowerCase() === 'admin') {
                    window.location.href = 'dashboard.html';
                } else {
                    addError(usernameInput, 'Invalid username or password');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Sign in';
                }
            }, 1000);
        }
    });
}); 