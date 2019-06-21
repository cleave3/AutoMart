/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const userAddress = document.getElementById('user-address');
const userEmail = document.getElementById('signup-email');
const userPassword = document.getElementById('signup-password');
const confirmUserPassword = document.getElementById('confirm-password');
const signupBtn = document.getElementById('signup-button');
const responseForm = document.getElementById('response-form');
const spinner = document.querySelector('.loader');
const inputs = document.querySelectorAll('input');
const url = 'https://cleave-automart.herokuapp.com/api/v1/auth/signup';

// regex patterns
const patterns = {
  first_name: /^[a-z]{3,20}$/i,
  last_name: /^[a-z]{3,20}$/i,
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  password: /^[\d\w@-]{8,20}$/i,
};

// validation function
const validate = (field, regex) => {
  if (regex.test(field.value)) {
    field.className = 'valid';
  } else {
    field.className = 'invalid';
  }
};

// attach keyup events to inputFields
inputs.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    validate(e.target, patterns[e.target.attributes.name.value]);
  });
});

// validate empty fields
const validateFields = () => {
  inputs.forEach((input) => {
    if (input.value === '') {
      responseForm.textContent = 'Please complete required fields';
      responseForm.style.display = 'block';
      responseForm.style.backgroundColor = 'rgb(235, 91, 86)';
      input.style.borderColor = 'rgb(235, 91, 86)';
      spinner.style.display = 'none';
      input.focus();
      return false;
    }
    input.style.borderColor = '';
  });
};

// verify matching passwords
const verifyPassword = () => {
  if (userPassword.value !== confirmUserPassword.value) {
    confirmUserPassword.className = 'invalid';
    spinner.style.display = 'none';
    confirmUserPassword.focus();
    return false;
  }
  confirmUserPassword.className = '';
};

// spinner
const loading = () => {
  spinner.style.display = 'block';
};

// Diplay server response
const responsAction = (responseData) => {
  if (responseData.error) {
    responseForm.textContent = responseData.error;
    responseForm.style.display = 'block';
    responseForm.style.backgroundColor = 'rgb(235, 91, 86)';
  }
  if (!responseData.error) {
    responseForm.textContent = 'Registration Sucessful';
    responseForm.style.display = 'block';
    responseForm.style.backgroundColor = 'rgb(53, 201, 53)';
    setTimeout(() => {
      responseForm.style.display = 'none';
      window.location = 'login.html';
    }, 2000);
  }
};

// initiate signup
const init = () => {
  responseForm.style.display = 'none';
  loading();
  validateFields();
  verifyPassword();
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      first_name: firstName.value,
      last_name: lastName.value,
      address: userAddress.value,
      email: userEmail.value,
      password: userPassword.value,
      confirmPassword: confirmUserPassword.value,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data) {
        spinner.style.display = 'none';
        console.log(data);
        responsAction(data);
      }
    });
};

// Add event listener to signup button
signupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  init();
});
