const display = document.querySelector('#ads-container');
const spinner = document.querySelector('.loader');
const response = document.querySelector('.result');
const token = sessionStorage.getItem('token');
const url = 'https://cleave-automart.herokuapp.com/api/v1';

/**
 * ADS TEMPLATE TO DISPLAY ON PAGE
 * @param {object} data
 */
const displayMyOrders = async (data) => {
  const template = `<div id="ads-box" order-id=${data.order_id}>
    <div>
        <img src=${data.image_url} alt=${data.manufacturer}>
        <p>${data.manufacturer} ${data.model}</p>
        <p> offer: &#8358 ${data.amount}</p>
        <p> My offer: &#8358 ${data.price_offered}</p>
        <p> Status: ${data.status}</p>
    </div>
    <div class="update-container">
        <input name= "offer" type="number" placeholder="New offer">
        <button class="update-button">Update</button>
    </div>
    </div>`;
  await display.insertAdjacentHTML('afterbegin', template);
};

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
        console.log(order);
        displayMyOrders(order);
      });
    });
};
getMyAds();

/**
 *UPDATE OFFER
 * @param {params} id
 * @param {number} offer
 */
const updateOffer = (id, offer) => {
  fetch(`${url}/order/${id}/price`, {
    method: 'PATCH',
    headers: {
      'x-access-token': `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      offer,
    }),
  })
    .then(res => res.json())
    .then((order) => {
      if (order.error) {
        alert(order.error);
        return;
      }
      location.reload();
    });
};

/** ADD EVENT LISTENERS TO BUTTONS */
document.addEventListener('click', (e) => {
  const id = e.target.parentElement.parentElement.getAttribute('order-id');
  const offer = Number(e.target.parentElement.childNodes[1].value);
  if (e.target.className === 'update-button') {
    if (offer === 0 || offer === '') {
      alert('offer cannot be empty');
      return;
    }
    const sure = confirm('Please confirm');
    if (sure === true) {
      updateOffer(id, offer);
    }
  }
});
