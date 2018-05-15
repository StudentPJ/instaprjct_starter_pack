function signup () {
	rootEl.innerHTML = templates.signup();
	var form = document.getElementById('signup-form');

	var {email, username, displayName, password, passwordConfirm} = form;

	window.email = new FormField(email, {
		validations: ['required', 'hasAtSymbol']
	});

	window.password = new FormField(password, {
		validations: ['password']
	});

	window.username = new FormField(username, {
		validations: ['username']
	});

	/*form.addEventListener('submit', (e) => {
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

		if(!isValidUsername(username.value)) {
			username.parentNode.classList.add('has-error');
			username.nextElementSibling.innerText = 'Username should have only letters';
		} else {
			username.parentNode.classList.remove('has-error');
			username.parentNode.classList.add('has-success');
			username.nextElementSibling.innerText = '';
		}

		if(password.value !== passwordConfirm.value) {
			passwordConfirm.parentNode.classList.add('has-error');
			passwordConfirm.nextElementSibling.innerText = 'Wrong password confirm';
		} else {
			passwordConfirm.parentNode.classList.remove('has-error');
			passwordConfirm.parentNode.classList.add('has-success');
			passwordConfirm.nextElementSibling.innerText = '';
		}

		if(isValidMail(email.value) && isValidPassword(password.value)) {
			firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
				.then((value) => {
					firebase.database().ref(`users/${value.uid}`).set({
						email: email.value,
						username: username.value,
						displayName: displayName.value,
						createdAt: (new Date()).toISOString()
					})
						.then(() => {
							page('/');
						})
				});
		}
	});*/
}

/*
function isValidMail(value) {
	const emailRe = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	return emailRe.test(value);
}

function isValidPassword(value) {
	return value.length >= 6;
}

function isValidUsername(value) {
	return /\w+/.test(value);
}*/
