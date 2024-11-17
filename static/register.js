document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Gather all form input values
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('role').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    let company_name = "";

    // Check if the company name field is visible and has a value
    if (role === 'OWNER') {
        company_name = document.getElementById('company').value;
    }

    // Send data to the backend
    fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role, name, phone, email, company_name }),
    })
    .then(response => response.json())
    .then(data => {
        // Remove any existing messages
        const existingMessage = document.querySelector('.success-message, .error-message');
        if (existingMessage) existingMessage.remove();

        if (data.message) {  // Success case
        const successMessage = document.createElement('p');
        successMessage.textContent = data.message;
        successMessage.classList.add('success-message');
        document.body.appendChild(successMessage);

            // Clear form data after successful submission
            document.getElementById('registerForm').reset();

            // Redirect to login page after a brief delay
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } else if (data.error) {  // Error case
        const errorMessage = document.createElement('p');
        errorMessage.textContent = data.error;
        errorMessage.classList.add('error-message');
        document.body.appendChild(errorMessage);
    }
})
    .catch(error => {
        console.error('Error registering:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'An error occurred during registration. Please try again later.';
        errorMessage.classList.add('error-message');
        document.body.appendChild(errorMessage);
    });
});

// Toggle function for company name field
function toggleCompanyNameField() {
    const roleSelect = document.getElementById('role');
    const companyNameField = document.getElementById('companyNameField');

    if (roleSelect.value === 'OWNER') {
        companyNameField.style.display = 'block';
    } else {
        companyNameField.style.display = 'none';
    }
}

// Add event listener to call the toggle function when the role changes
document.getElementById('role').addEventListener('change', toggleCompanyNameField);

// Initial call to set the correct visibility on page load
toggleCompanyNameField();
