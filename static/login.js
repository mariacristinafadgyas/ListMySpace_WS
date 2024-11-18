// Handle login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Send request to the correct backend URL (localhost:5000)
    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Send login credentials
    })
    .then(response => {
        // Check if the response is not OK (e.g., 400, 401, 500) and handle errors
        if (!response.ok) {
            return response.json().then(data => { throw data; });
        }
        return response.json(); // Parse the response as JSON
    })
    .then(data => {
        // Remove any existing messages
        const existingMessage = document.querySelector('.success-message, .error-message');
        if (existingMessage) existingMessage.remove();

        if (data.token) {
            // Success case: store the token and show a success message
            localStorage.setItem('token', data.token);

            const successMessage = document.createElement('p');
            successMessage.textContent = 'Login successful! Redirecting...';
            successMessage.classList.add('success-message');
            document.body.appendChild(successMessage);

            // Redirect after a brief delay
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }
    })
    .catch(error => {
        // Display error message if login fails
        console.error('Error logging in:', error);

        // Remove any existing messages
        const existingMessage = document.querySelector('.success-message, .error-message');
        if (existingMessage) existingMessage.remove();

        const errorMessage = document.createElement('p');
        errorMessage.textContent = error.message || 'An error occurred. Please try again.';
        errorMessage.classList.add('error-message');
        document.body.appendChild(errorMessage);
    });
});
