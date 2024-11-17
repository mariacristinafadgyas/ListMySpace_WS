document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Gather all form input values
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('role').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    let company = "";

    // Check if the company name field is visible and has a value
    if (role === 'OWNER') {
        company = document.getElementById('company').value;
    }

    // Send data to the backend
    fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role, name, phone, email, company }),
    })
    .then(response => response.json())
    .then(data => {
        // Remove any existing messages
        const existingMessage = document.querySelector('.success-message, .error-message');
        if (existingMessage) existingMessage.remove();

        if (data.message === "User registered successfully.") {
            const successMessage = document.createElement('p');
            successMessage.textContent = "Registration successful! Redirecting to login...";
            successMessage.classList.add('success-message');
            document.body.appendChild(successMessage);

            // Redirect to login page after 2 seconds
            setTimeout(function() {
                window.location.href = '/';
            }, 2000);
        } else {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = data.message;
            errorMessage.classList.add('error-message');
            document.body.appendChild(errorMessage);
        }
    })
    .catch(error => console.error('Error registering:', error));
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
