/****** VIEW CARS AND ORDER *********/
const infoBox = document.querySelectorAll('.display-box');
const buyBtn = document.querySelector('.buy-button');

infoBox.forEach(element => {
    element.addEventListener('click', () => {
			window.location ='car_details.html';
    })
});

buyBtn.addEventListener('click', () => {
    confirm('CONFIRM ORDER');
});