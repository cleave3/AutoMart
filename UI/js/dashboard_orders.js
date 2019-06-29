const display = document.querySelector('#ads-container');
const spinner = document.querySelector('.loader');
const response = document.querySelector('.result');
const token = sessionStorage.getItem('token');
const url = 'http://localhost:8080/api/v1';

/**
 * ADS TEMPLATE TO DISPLAY ON PAGE
 * @param {object} data
 */
// const displayMyAds = async (data) => {
//   const template = `<div id="ads-box" car-id=${data.car_id}>
//     <img src=${data.image_url}>
//     <div>
//         <p>Manufacturer: ${data.manufacturer}</p>
//         <p>Model: ${data.model}</p>
//         <p> Price: &#8358 ${data.price}</p>
//         <p class="status">Status: ${data.status}</p>
//     </div>
//     <div class="update-container">
//         <button status=${data.status} class="sold-botton">SOLD</button>
//         <input name= "price" type="number" placeholder="price">
//         <button status=${data.status} class=update-button>Update</button>
//     </div>
//     </div>`;
//   await display.insertAdjacentHTML('afterbegin', template);
// };

/**
 * LOAD USER POSTED ADS
 */
const getMyAds = async () => {
  fetch(`${url}/buyer/order`, {
    method: 'GET',
    headers: {
      'x-access-token': `${token}`,
    },
  })
    .then(res => res.json())
    .then((orders) => {
      if (orders.error) {
        spinner.style.display = 'none';
        response.innerHTML = orders.error;
        return;
      }
      spinner.style.display = 'none';
      orders.data.forEach((order) => {
        // displayMyAds(car);
        console.log(order);
      });
    });
};
getMyAds();

/**
 *UPDATE CAR PRICE
 * @param {params} id
 * @param {number} price
 */
// const updatePrice = (id, price) => {
//   fetch(`${url}/car/${id}/price`, {
//     method: 'PATCH',
//     headers: {
//       'x-access-token': `${token}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       price,
//     }),
//   })
//     .then(res => res.json())
//     .then((cars) => {
//       if (cars.error) {
//         spinner.style.display = 'none';
//         alert(cars.error);
//         return;
//       }
//       spinner.style.display = 'none';
//       location.reload();
//     });
// };

/** ADD EVENT LISTENERS TO BUTTONS */
// document.addEventListener('click', (e) => {
//   const id = e.target.parentElement.parentElement.getAttribute('car-id');
//   const carprice = Number(e.target.parentElement.childNodes[3].value);
//   if (e.target.className === 'sold-botton') {
//     const sure = confirm('Please confirm');
//     if (sure === true) {
//       carSold(id);
//     }
//   } else if (e.target.className === 'update-button') {
//     const sure = confirm('Please confirm');
//     if (sure === true) {
//       updatePrice(id, carprice);
//     }
//   }
// });
