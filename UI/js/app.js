/**** DISPLAY MODAL AND SWITCHING BETWEEN SIGNUP AND LOGIN *****/
const signup = document.querySelectorAll('#nav-signup, #join, #signup');
const login = document.querySelectorAll('#nav-login, #login');
const close = document.querySelector('.closeModal');

signup.forEach(element => {
	element.addEventListener('click', () => {
		document.querySelector('.modal').style.display = 'block';
		document.querySelector('.signupForm').style.display = 'block';
		document.querySelector('.loginForm').style.display = 'none';
	})
});

login.forEach(element => {
	element.addEventListener('click', () => {
		document.querySelector('.modal').style.display = 'block';
		document.querySelector('.signupForm').style.display = 'none';
		document.querySelector('.loginForm').style.display = 'block';
	})
});

close.addEventListener('click', () => {
	document.querySelector('.modal').style.display = 'none';;
})