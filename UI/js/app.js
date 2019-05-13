/****** VIEW CARS AND ORDER *********/

const infoBox = document.querySelectorAll('.display-box');

infoBox.forEach(element => {
    element.addEventListener('click', (event) => {
        if(event.target.className == 'car-button'){
			confirm('CONFIRM ORDER !');
        }else {
			window.location ='car_details.html';
		}
    })
})