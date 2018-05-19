const errorTexts = {
	required: 'Field should be required',
	hasAtSymbol: 'Field should has @',
	password: 'Password should be at least six symbols',
	username: 'Username should contains only letters',
	displayName: 'Username should contains only letters'
};

const validators = {
	required: value => value.length !== 0,
	hasAtSymbol: value => value.indexOf('@') !== -1,
	password: value => value.length > 6,
	username: value =>  /\w+/.test(value),
	displayName: value => /\w+/.test(value)
};

class FormField {
	constructor(element, options) {
		this.element = element;
		this.options = Object.assign({}, FormField.defaultOptions, options);
		this.errors = [];
	}

	isValid() {
		for(let i = 0; i < this.options.validations.length; i++) {
			let valName = this.options.validations[i];

			if(validators[valName](this.element.value) === false) {
				this.errors.push(errorTexts[valName]);
				return false;
			}

		}

		return true;
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