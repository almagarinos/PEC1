const form = document.getElementById('form');
const age = document.getElementById('age');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError (input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess (input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Get fieldname in Spanish using name, not id
function getFieldName(input) {
    return input.name;
}

// Check input length
function checkLength (input, min, max) {
    if (input.value.length < min) {
        showError(input, `El campo ${getFieldName(input)} debe tener al menos ${min} caracteres`)
    } else if (input.value.length > max) {
        showError(input, `El campo ${getFieldName(input)} debe tener como máximo ${max} caracteres`)
    } else {
        showSuccess(input);
    }
}

// Check age is valid
function checkAge(input) {
    if(input.value >= 0 && input.value < 1000 && input.value !== '') {
        console.log('Entra en el rango')
        showSuccess(input);
    } else {
        showError(input, 'La edad debe comprender entre 0 y 999 años');
    }
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    } else {
        showError(input, 'El e-mail no es válido');
    }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Este campo debe coincidir con el campo Contraseña');
    }
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (age.value !== '') {
        showError(age, 'Rellene el campo Edad con un número');
    }

    if (password2.value === '') {
        showError(password2, 'La repetición de contraseña es necesaria');
    } else {
        showSuccess(password2);
    }

    checkLength(username, 3, 15);
    checkAge(age);
    checkEmail(email);
    checkLength(password, 8, 25);
    checkPasswordsMatch(password, password2);
});