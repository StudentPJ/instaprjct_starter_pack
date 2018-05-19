function login() {
	rootEl.innerHTML = templates.login();

	var form = document.getElementById('login-form');

	var {email, password} = form;

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		let emailValidate = new FormField(email, {
			validations: ['required', 'hasAtSymbol']
		});

		let passwordValidate = new FormField(password, {
			validations: ['password']
		});

		emailValidate.validate();
		passwordValidate.validate();

		if(emailValidate.isValid() && passwordValidate.isValid()) {
			firebase.auth().signInWithEmailAndPassword(email.value, password.value)
				.then(() => {
					page('/');
				})
		}
	});

}