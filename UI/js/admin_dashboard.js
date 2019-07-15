const display = document.querySelector('.display-area');
const spinner = document.querySelector('.loader');
const response = document.querySelector('.result');
const token = sessionStorage.getItem('token');
const url = 'https://cleave-automart.herokuapp.com/api/v1';
/**
 * ADS TEMPLATE TO DISPLAY ON PAGE
 * @param {object} data
 */
const displayMycars = async (data) => {
  const template = `<div class="display-box" car-id=${data.car_id}>
  <img src=${data.image_url} alt=${data.manufacturer}>
  <p class="car-manufacturer">${data.manufacturer} ${data.model}</p>
  <p class="car-price"><b>Price: </b><b>&#8358</b>${data.price}</p>
  <p class="car-price"><b>State: </b>${data.state}</p>
  <p class="car-status"><b>Status: </b>${data.status}</p>
  <button class="remove-button">REMOVE</button>
</div>`;
  await display.insertAdjacentHTML('afterbegin', template);
};

/**
 * LOAD ALL POSTED ADS
 */
const getAllAds = async () => {
  fetch(`${url}/car`, {
    method: 'GET',
    headers: {
      'x-access-token': `${token}`,
    },
  })
    .then(res => res.json())
    .then((cars) => {
      if (cars.error) {
        spinner.style.display = 'none';
        response.innerHTML = cars.error;
        return;
      }
      spinner.style.display = 'none';
      cars.data.forEach((car) => {
        console.log(car);
        displayMycars(car);
      });
    });
};
getAllAds();

/**
 *UPDATE OFFER
 * @param {params} id
 * @param {number} offer
 */
const deleteAd = (id) => {
  fetch(`${url}/car/${id}`, {
    method: 'DELETE',
    headers: {
      'x-access-token': `${token}`,
    },
  })
    .then(res => res.json())
    .then((car) => {
      if (car.error) {
        alert(car.error);
        return;
      }
      alert(car.data);
      location.reload();
    });
};

/** ADD EVENT LISTENERS TO BUTTONS */
document.addEventListener('click', (e) => {
  const id = e.target.parentElement.getAttribute('car-id');
  if (e.target.className === 'remove-button') {
    const sure = confirm('Are you sure you want to delete this Ad ?');
    if (sure === true) {
      deleteAd(id);
    }
  }
});
