function signup () {
	rootEl.innerHTML = templates.signup();
	var form = document.getElementById('signup-form');
	var {email, username, displayName, password, passwordConfirm} = form;

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		if(!isValidMail(email.value)) {
			email.parentNode.classList.add('has-error');
			email.nextElementSibling.innerHTML = 'Email is required';
		}

		if(!isValidPassword(password.value)) {
			password.parentNode.classList.add('has-error');
			password.nextElementSibling.innerHTML = 'Password is required';
		}

		if(password.value !== passwordConfirm.value) {
			passwordConfirm.parentNode.classList.add('has-error');
			passwordConfirm.nextElementSibling.innerHTML = 'Wrong passwordConfirm';
		}

		if(isValidMail(email.value) && isValidPassword(password.value)) {
			firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
				.then((value) => {
					firebase.database().ref(`users/${value.uid}`).set({
						email: email.value,
						username: username.value,
						displayName: displayName.value
					})
				});
		}
	});
}

function isValidMail(value) {
	return value.includes('@');
}

function isValidPassword(value) {
	return value.length >= 6;
}

function isValidUsername(value) {
	return /\w+/.test(value);
}