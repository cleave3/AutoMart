/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
const url = 'https://cleave-automart.herokuapp.com/api/v1/auth/signin';
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-button');
const responseForm = document.getElementById('response-form');
const spinner = document.querySelector('.loader');
const inputs = document.querySelectorAll('input');

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

// spinner
const loading = () => {
  spinner.style.display = 'block';
};

const loginResponse = (responseData) => {
  if (responseData.error) {
    responseForm.textContent = responseData.error;
    responseForm.style.display = 'block';
    responseForm.style.backgroundColor = 'rgb(235, 91, 86)';
  }
  if (!responseData.error) {
    responseForm.textContent = `Welcome ${responseData.data.first_name}`;
    responseForm.style.display = 'block';
    responseForm.style.backgroundColor = 'rgb(53, 201, 53)';
    // location.assign('user/dashboard.html');
  }
};
// initiate login
const login = async () => {
  responseForm.style.display = 'none';
  loading();
  validateFields();
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data) {
        spinner.style.display = 'none';
        loginResponse(data);
      }
    });
};

// Add event listener to login button
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  login();
});
