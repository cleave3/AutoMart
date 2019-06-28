const display = document.querySelector('#ads-container');
const spinner = document.querySelector('.loader');
const statusDiv = document.querySelector('.status');
const soldBtn = document.querySelector('.sold-botton');
const response = document.querySelector('.result');
const token = sessionStorage.getItem('token');
const url = 'https://cleave-automart.herokuapp.com/api/v1';

const displayMyAds = async (data) => {
  const template = `<div id="ads-box" car-id=${data.car_id}>
    <img src=${data.image_url}>
    <div>
        <p>Manufacturer: ${data.manufacturer}</p>
        <p>Model: ${data.model}</p>
        <p> Price: &#8358 ${data.price}</p>
        <p class="status">Status: ${data.status}</p>
    </div>
    <div class="update-container">
        <button status=${data.status} class="sold-botton">SOLD</button>
        <input name= "price" type="number" placeholder="price">
        <button class=update-button>Update</button>
    </div>
    </div>`;
  await display.insertAdjacentHTML('afterbegin', template);
};


window.addEventListener('mouseover', (e) => {
  if (e.target.className === 'sold-botton') {
    if (e.target.getAttribute('status') === 'sold') {
      e.target.disabled = true;
      e.target.className = 'sold';
    }
  }
});

const getMyAds = async () => {
  fetch(`${url}/owner/car`, {
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
        displayMyAds(car);
      });
    });
};
getMyAds();

const carSold = async (id) => {
  fetch(`${url}/car/${id}/status`, {
    method: 'PATCH',
    headers: {
      'x-access-token': `${token}`,
    },
  })
    .then(res => res.json())
    .then((cars) => {
      if (cars.error) {
        spinner.style.display = 'none';
        alert(cars.error);
        return;
      }
      spinner.style.display = 'none';
      location.reload();
    });
};

document.addEventListener('click', (e) => {
  const id = e.target.parentElement.parentElement.getAttribute('car-id');
  if (e.target.className === 'sold-botton') {
    console.log(e.target);
    const sure = confirm('Please confirm');
    if (sure === true) {
      carSold(id);
      console.log(id);
    }
  }
});
