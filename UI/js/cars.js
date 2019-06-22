const url = 'https://cleave-automart.herokuapp.com/api/v1/car?status=available';
const display = document.querySelector('.display-area');
const spinner = document.querySelector('.loader');
const responseForm = document.querySelector('.result');

/**
 * INITIALIZING THE LOADER
 */
const loading = () => {
  spinner.style.display = 'block';
};

/**
 * FETCH AND DISPLAY DATA ON PAGE
 */
const getData = async () => {
  loading();
  try {
    const payload = await fetch(url);
    const cars = await payload.json();
    const res = cars.data;
    if (cars.data.error) {
      spinner.style.display = 'none';
      responseForm.textContent = cars.data.error;
    }
    await res.forEach((data) => {
      const template = `<div class="display-box" car-id=${data.car_id}>
      <img src=${data.image_url} alt="ford">
      <p class="car-manufacturer"><b>Manufacturer: </b>${data.manufacturer}</p>
      <p class="car-model"><b>Model: </b>${data.model}</p>
      <p class="car-transimission"><b>Transmission: </b>${data.transmission_type}</p>
      <p class="car-price"><b>Price: </b><b>&#8358</b>${data.price}</p>
      <button class="car-button">BUY</button>
      </div>`;
      spinner.style.display = 'none';
      display.insertAdjacentHTML('afterbegin', template);
    });
  } catch (error) {
    spinner.style.display = 'none';
    responseForm.textContent = 'Oops! Something went wrong';
  }
};
getData();

display.addEventListener('click', (e) => {
  if (e.target.className === 'car-button') {
    window.location = 'car_details.html';
  }
});
