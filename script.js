// ==========================================
// DOM Assignment #6 - Form Events & Validation
// ==========================================

// Wait for DOM to load completely
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // Element Selections
    // ==========================================
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formMessage = document.getElementById('formMessage');
    const resetBtn = document.getElementById('resetBtn');
    const strengthBars = document.querySelectorAll('.strength-bar');

    // ==========================================
    // Helper Functions
    // ==========================================
    
    // Show error message for specific field
    function showError(inputElement, errorElement, message) {
        inputElement.classList.add('error');
        inputElement.classList.remove('success');
        errorElement.textContent = message;
    }
    
    // Show success state for field
    function showSuccess(inputElement, errorElement) {
        inputElement.classList.remove('error');
        inputElement.classList.add('success');
        errorElement.textContent = '';
    }
    
    // Clear field state
    function clearFieldState(inputElement, errorElement) {
        inputElement.classList.remove('error', 'success');
        errorElement.textContent = '';
    }
    
    // Display form-level message
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
    }
    
    // Clear form message
    function clearFormMessage() {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }
    
    // Update password strength indicator
    function updatePasswordStrength(password) {
        // Reset all bars
        strengthBars.forEach(bar => {
            bar.className = 'strength-bar';
        });
        
        if (password.length === 0) return;
        
        if (password.length < 6) {
            strengthBars[0].classList.add('weak');
        } else if (password.length < 10) {
            strengthBars[0].classList.add('medium');
            strengthBars[1].classList.add('medium');
        } else {
            strengthBars[0].classList.add('strong');
            strengthBars[1].classList.add('strong');
            strengthBars[2].classList.add('strong');
        }
    }

    // ==========================================
    // Task 1 & 2: Form Submit Handler
    // ==========================================
    form.addEventListener('submit', function(event) {
        // Task 1: Prevent Form Submission (page reload)
        event.preventDefault();
        
        // Get input values
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value;
        
        let isValid = true;
        
        // Clear previous messages
        clearFormMessage();
        
        // ==========================================
        // Task 2: Required Field Validation (Name)
        // ==========================================
        if (nameValue === '') {
            showError(nameInput, nameError, 'Name is required');
            isValid = false;
        } else {
            showSuccess(nameInput, nameError);
        }
        
        // ==========================================
        // Task 3: Email Validation
        // ==========================================
        if (emailValue === '') {
            showError(emailInput, emailError, 'Email is required');
            isValid = false;
        } else if (!emailValue.includes('@')) {
            showError(emailInput, emailError, 'Invalid Email - must contain @');
            isValid = false;
        } else {
            showSuccess(emailInput, emailError);
        }
        
        // ==========================================
        // Task 4: Password Length Check
        // ==========================================
        if (passwordValue === '') {
            showError(passwordInput, passwordError, 'Password is required');
            isValid = false;
        } else if (passwordValue.length < 6) {
            showError(passwordInput, passwordError, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            showSuccess(passwordInput, passwordError);
        }
        
        // ==========================================
        // Task 5: Show Error Message in DOM
        // ==========================================
        if (isValid) {
            showFormMessage('Form Submitted Successfully!', 'success');
            // Optional: Log the form data
            console.log('Form Data:', {
                name: nameValue,
                email: emailValue,
                password: passwordValue
            });
        } else {
            showFormMessage('Please fix the errors above', 'error');
        }
    });

    // ==========================================
    // Task 5: Clear message when input becomes correct
    // Real-time validation feedback
    // ==========================================
    
    // Name input real-time validation
    nameInput.addEventListener('input', function() {
        const nameValue = nameInput.value.trim();
        
        if (nameValue !== '') {
            showSuccess(nameInput, nameError);
            // Clear form message if correcting errors
            if (formMessage.classList.contains('error')) {
                clearFormMessage();
            }
        } else {
            clearFieldState(nameInput, nameError);
        }
    });
    
    // Email input real-time validation
    emailInput.addEventListener('input', function() {
        const emailValue = emailInput.value.trim();
        
        if (emailValue !== '' && emailValue.includes('@')) {
            showSuccess(emailInput, emailError);
            if (formMessage.classList.contains('error')) {
                clearFormMessage();
            }
        } else if (emailValue === '') {
            clearFieldState(emailInput, emailError);
        }
    });
    
    // Password input real-time validation + strength indicator
    passwordInput.addEventListener('input', function() {
        const passwordValue = passwordInput.value;
        
        // Update strength bars
        updatePasswordStrength(passwordValue);
        
        if (passwordValue.length >= 6) {
            showSuccess(passwordInput, passwordError);
            if (formMessage.classList.contains('error')) {
                clearFormMessage();
            }
        } else if (passwordValue === '') {
            clearFieldState(passwordInput, passwordError);
        }
    });

    // ==========================================
    // Task 6: Reset Form
    // ==========================================
    resetBtn.addEventListener('click', function() {
        // Clear all input fields
        form.reset();
        
        // Clear all error messages and states
        clearFieldState(nameInput, nameError);
        clearFieldState(emailInput, emailError);
        clearFieldState(passwordInput, passwordError);
        
        // Clear form message
        clearFormMessage();
        
        // Reset password strength indicator
        strengthBars.forEach(bar => {
            bar.className = 'strength-bar';
        });
        
        // Focus on first input
        nameInput.focus();
    });

});