/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
const cancelBtn = document.getElementById('cancel-button');
const myForm = document.getElementById('sale-form');
const token = sessionStorage.getItem('token');
const spinner = document.querySelector('.loader');
const responseForm = document.getElementById('response-form');
/**
 * HANDLE FECTCH RESPONSE
 * @param {object} car
 */
const handleResponse = (car) => {
  if (car.data) {
    spinner.style.display = 'none';
    responseForm.innerHTML = 'AD CREATED SUCCESSFULLY';
    responseForm.style.display = 'block';
    return;
  }
  spinner.style.display = 'none';
  responseForm.style.display = 'block';
  responseForm.style.color = 'red';
  responseForm.innerHTML = car.error;
  setTimeout(() => {
    window.location = 'login.html';
  }, 2000);
};

/** ADD EVENT LISTENER TO FORM SUBMISSSION */
myForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  responseForm.innerHTML = '';
  confirm('Please confirm');
  spinner.style.display = 'block';
  const formData = new FormData(myForm);
  const options = {
    method: 'POST',
    body: formData,
    headers: {
      'x-access-token': `${token}`,
    },
  };
  await fetch('https://cleave-automart.herokuapp.com/api/v1/car', options)
    .then(res => res.json())
    .then((car) => {
      handleResponse(car);
    });
});

/** ADD EVENT LISTENER TO CANCEL BUTTON */
cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = 'car_view.html';
});
