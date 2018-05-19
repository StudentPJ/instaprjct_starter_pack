function signup () {
	rootEl.innerHTML = templates.signup();
	let form = document.getElementById('signup-form');

	let {email, username, displayName, password, passwordConfirm} = form;

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		let emailValidate = new FormField(email, {
			validations: ['required', 'hasAtSymbol']
		});

		let passwordValidate = new FormField(password, {
			validations: ['password']
		});

		let usernameValidate = new FormField(username, {
			validations: ['username']
		});

		let displayNameValidate = new FormField(displayName, {
			validations: ['displayName']
		});

		emailValidate.validate();
		passwordValidate.validate();
		usernameValidate.validate();
		displayNameValidate.validate();

		if(emailValidate.isValid() && passwordValidate.isValid()) {
			firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
				.then((value) => {
					firebase.database().ref(`users/${value.uid}`).set({
						uid: value.uid,
						email: email.value,
						username: username.value,
						displayName: displayName.value,
						createdAt: (new Date()).toISOString()
					})
						.then(() => {
							page('/');
						});
				});
		}
	});
}