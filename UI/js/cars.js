const display = document.querySelector('.display-area');
const displaySearch = document.querySelector('.search-result');
const spinner = document.querySelector('.loader');
const spinner2 = document.querySelector('.loader2');
const carDetails = document.querySelector('.car-details');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.closeModal');
const minPrice = document.querySelector('#min_price');
const maxPrice = document.querySelector('#max_price');
const search = document.querySelector('#search-button');
const inputs = document.querySelectorAll('input');

/**
 * VALIDATE INPUT FIELDS
 */
const validateFields = () => {
  inputs.forEach((input) => {
    if (input.value === '' || input.value < 0) {
      input.value = 0;
      input.focus();
      return false;
    }
  });
};

/**
 * INITIALIZING THE LOADER
 */
const loading = async () => {
  spinner.style.display = 'block';
};

/** TEMPLATE FOR DISPLAYING DATA ON PAGE */
const displayCars = async (car) => {
  const template = `<div class="display-box" car-id=${car.car_id}>
  <img src=${car.image_url} alt="ford">
  <p class="car-manufacturer"><b>Manufacturer: </b>${car.manufacturer}</p>
  <p class="car-model"><b>Model: </b>${car.model}</p>
  <p class="car-price"><b>Price: </b><b>&#8358</b>${car.price}</p>
  <button class="car-button">BUY</button>
  </div>`;
  display.insertAdjacentHTML('afterbegin', template);
};

/** TEMPLATE FOR DISPLAYING SEARCH RESULT ON PAGE */
const searchCars = async (car) => {
  displaySearch.innerHTML = '';
  const template = `<div class="display-box" car-id=${car.car_id}>
  <img src=${car.image_url} alt="ford">
  <p class="car-manufacturer"><b>Manufacturer: </b>${car.manufacturer}</p>
  <p class="car-model"><b>Model: </b>${car.model}</p>
  <p class="car-price"><b>Price: </b><b>&#8358</b>${car.price}</p>
  <button class="car-button">BUY</button>
  </div>`;
  displaySearch.insertAdjacentHTML('afterbegin', template);
};

/**
 * VIEW SPECIFIC CAR TEMPLATE
 * @param {object} data 
 */
const displayDetails = async (data) => {
  const detailTemplate = `<div class="details-display-box" car-id=${data.car_id}>
  <img src=${data.image_url} alt="Toyota Camry">
  <div id="car-specs">
  <p id="" class="car-manufacturer"><b>Manufacturer: </b>${data.manufacturer}</p>
  <p class="car-model"><b>Model: </b>${data.model}</p>
  <p class="car-model"><b>Body: </b>${data.body_type}</p>
  <p class="car-transimission"><b>Transmission: </b>${data.transmission_type}
  <p class="car-model"><b>State: </b>${data.state}</p>
  <p class="car-price"><b>Price: </b><b>&#8358</b>${data.price}</p>
  </div>
  <div class="car-description-container"> 
  <h3>DESCRIPTION</h3>
  <p>${data.description}</p>
  </div>
  <button class="buy-button">BUY NOW</button>
  <a href="./car_view.html"><button class="back-button">CONTINUE SHOPPING</button></a></div>`;
  await carDetails.insertAdjacentHTML('afterbegin', detailTemplate);
};

/**
 * FETCH AVAILABLE CARS
 */
const getData = async () => {
  loading();
  try {
    const payload = await fetch('https://cleave-automart.herokuapp.com/api/v1/car?status=available');
    const cars = await payload.json();
    const res = cars.data;
    const noCar = cars.error;
    if (noCar) {
      display.style.color = 'red';
      display.innerHTML = noCar;
      return;
    }
    await res.forEach((data) => {
      if (data) {
        spinner.style.display = 'none';
        display.style.color = '';
        displayCars(data);
      }
      spinner.style.display = 'none';
    });
  } catch (error) {
    display.style.color = 'red';
    display.innerHTML = 'Oops! Something went wrong';
  }
};
getData();


/**
 * SEARCH AVAILABLE CARS BY PRICE RANGE
 */
const searchByPrice = async () => {
  validateFields();
  display.innerHTML = '';
  spinner2.style.display = 'block';
  try {
    const payload = await fetch(`https://cleave-automart.herokuapp.com/api/v1/car?status=available&min_price=${minPrice.value}&max_price=${maxPrice.value}`);
    const cars = await payload.json();
    const res = cars.data;
    const noCar = cars.error;
    if (noCar) {
      display.style.color = 'red';
      display.innerHTML = noCar;
      spinner2.style.display = 'none';
      return;
    }
    await res.forEach((data) => {
      if (data) {
        spinner2.style.display = 'none';
        display.style.color = '';
        searchCars(data);
      }
      spinner2.style.display = 'none';
    });
  } catch (error) {
    display.style.color = 'red';
    display.innerHTML = 'Oops! Something went wrong';
  }
};

/** ADD EVENT LISTENERS TO SEARCH BUTTON */
search.addEventListener('click', (e) => {
  e.preventDefault();
  loading();
  searchByPrice();
});

/**
 * VIEW A SPECIFIC CAR
 * @param {string} id 
 */
const viewCarDetails = async (id) => {
  carDetails.innerHTML = '';
  modal.style.display = 'block';
  const payload = await fetch(`https://cleave-automart.herokuapp.com/api/v1/car/${id}`);
  const car = await payload.json();
  const { data } = car;
  displayDetails(data);
};

/** ADD EVENT LISTENER TO DOCUMENT */
document.addEventListener('click', (e) => {
  if (e.target.className === 'car-button') {
    const id = e.target.parentElement.getAttribute('car-id');
    viewCarDetails(id);
  }
});

/** CLOSE MODAL */
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});
