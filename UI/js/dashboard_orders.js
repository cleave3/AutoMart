const display = document.querySelector('.table-body');
const spinner = document.querySelector('.loader');
const response = document.querySelector('.result');
const token = sessionStorage.getItem('token');
const url = 'https://cleave-automart.herokuapp.com/api/v1';
/**
 * ADS TEMPLATE TO DISPLAY ON PAGE
 * @param {object} data
 */
const displayMyOrders = async (data) => {
  const template = `<tr order-id=${data.order_id}>
    <td>${data.order_id}</td>
    <td>&#8358 ${data.amount}</td>
    <td>&#8358 ${data.price_offered}</td>
    <td>${data.status}</td>
    <td>
        <div class="update-container">
        <input name="offer" id="offer" type="number" placeholder="New offer">
        <button id="table-button" class="update-button">Update</button>
        </div>
    </td>
</tr>`;
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
const updateOffer = (id, price) => {
  fetch(`${url}/order/${id}/price`, {
    method: 'PATCH',
    headers: {
      'x-access-token': `${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      price,
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
  const id = e.target.parentElement.parentElement.parentElement.getAttribute('order-id');
  const offer = Number(e.target.parentElement.childNodes[1].value);
  if (e.target.className === 'update-button') {
    if (offer === 0 || offer === '' || offer < 0) {
      alert('Offer must be greater than zero');
      return;
    }
    const sure = confirm('Please confirm');
    if (sure === true) {
      updateOffer(id, offer);
    }
  }
});
