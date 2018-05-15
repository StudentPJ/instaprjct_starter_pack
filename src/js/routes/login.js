function login() {
	rootEl.innerHTML = templates.login();

	var form = document.getElementById('login-form');

	var {email, password} = form;

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		if(!isValidMail(email.value)) {
			email.parentNode.classList.add('has-error');
			email.nextElementSibling.innerText = 'Email is required';
		} else {
			email.parentNode.classList.remove('has-error');
			email.parentNode.classList.add('has-success');
			email.nextElementSibling.innerText = '';
		}

		if(!isValidPassword(password.value)) {
			password.parentNode.classList.add('has-error');
			password.nextElementSibling.innerText = 'Password is required';
		} else {
			password.parentNode.classList.remove('has-error');
			password.parentNode.classList.add('has-success');
			password.nextElementSibling.innerText = '';
		}

		if(isValidMail(email.value) && isValidPassword(password.value)) {
			firebase.auth().signInWithEmailAndPassword(email.value, password.value)
				.then(() => {
					page('/');
				})
		}
	});

}

function isValidMail(value) {
	const emailRe = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	return emailRe.test(value);
}

function isValidPassword(value) {
	return value.length >= 6;
}