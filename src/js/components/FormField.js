const errorTexts = {
	required: 'Field should be required',
	hasAtSymbol: 'Field should has @',
	password: 'Password should be at least six symbols',
	username: 'Username should contains only letters'
};

const validators = {
	required: value => value.length !== 0,
	hasAtSymbol: value => value.indexOf('@') !== -1,
	password: value => value.length > 6,
	username: value =>  /\w+/.test(value)
};

class FormField {
	constructor(element, options) {
		this.element = element;
		this.options = Object.assign({}, FormField.defaultOptions, options);
		this.errors = [];
	}

	isValid() {
		let isValid = true;
		this.options.validations.forEach((element) => {
			if(validators[element](this.element.value) === false) {
				isValid = false;
			}
			this.errors.push(errorTexts[element]);
		});

		return isValid;
	}

	resetState() {
		this.element.parentNode.classList.remove(this.options.errorClass);
		this.element.parentNode.classList.remove(this.options.successClass);
		this.element.nextElementSibling.innerText = '';
	}

	setErrorState(message) {
		this.element.parentNode.classList.add(this.options.errorClass);
		this.element.nextElementSibling.innerText = this.errors;
		if(this.errors.length !== 0) {
			this.errors = [];
		}
	}

	setSuccessState() {
		this.errors = [];
		this.element.parentNode.classList.add(this.options.successClass);
	}

	validate() {
		if(this.isValid() === false) {
			this.resetState();
			this.setErrorState();
		} else {
			this.resetState();
			this.setSuccessState();
		}
	}
}

FormField.defaultOptions = {
	validations: [],
	errorClass: 'has-error',
	successClass: 'has-success'
};