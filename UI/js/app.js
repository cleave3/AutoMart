/******DISPLAY BOXES *********/
const infoBox = document.querySelectorAll('.display-box');
// const details = document.querySelector('.car-details');
// const displayArea = document.querySelector('.display-area');
// const back = document.querySelector('.back-button');

infoBox.forEach(element => {
    element.addEventListener('click', (event) => {
        window.location ='car_details.html';
        if(event.target.className == 'car-button'){
            // displayArea.style.display ='none';
            // details.style.display ='block';
            // details.insertAdjacentElement("afterbegin", element);
            // window.location ='index.html';
            window.location ='car_details.html';
        }
    })
})