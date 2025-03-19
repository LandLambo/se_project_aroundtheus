class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector; //".modal__form-input"
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputElements = settings.inputElements;
    // this._inputElement = settings.inputElement;
    this._form = formElement;
    // this._checkInputValidity = settings._checkInputValidity;
    this._options = settings.options;
  }

  _showInputError(inputElement, validationMessage) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _toggleButtonState() {
    if (hasInvalidInput(inputElements)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _checkInputValidity(inputElement, validationMessage) {
    if (!inputElement.validity.valid) {
      return showInputError(this._form, inputElement, options);
    }
    hideInputError(this._form, inputElement, options);
  }

  _hasInvalidInput() {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }

  _setEventListeners() {
    this._inputElements = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        checkInputValidity(this._form, inputElement, options);
        toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
