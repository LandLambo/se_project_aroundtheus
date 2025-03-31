class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _showInputError(inputElement, validationMessage) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement, inputElement.validationMessage);
    }
    this._hideInputError(inputElement);
  }

  _hasInvalidInput() {
    return this._inputElements.some(
      (inputElement) => !inputElement.validity.valid
    );
  }

  _setEventListeners() {
    this._inputElements = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (e) => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
  }

  resetValidation() {
    this.toggleButtonState();

    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}

export default FormValidator;

// class FormValidator {
//   constructor(settings, formElement) {
//     this._inputSelector = settings.inputSelector;
//     this._submitButtonSelector = settings.submitButtonSelector;
//     this._inactiveButtonClass = settings.inactiveButtonClass;
//     this._inputErrorClass = settings.inputErrorClass;
//     this._errorClass = settings.errorClass;
//     this._formElement = formElement;
//     this._inputs = Array.from(
//       formElement.querySelectorAll(this._inputSelector)
//     );
//     this._submitButton = formElement.querySelector(this._submitButtonSelector);
//   }

//   // Method to show input errors
//   _showInputError(inputElement, errorMessage) {
//     const errorElement = this._formElement.querySelector(
//       `#${inputElement.id}-error`
//     );
//     inputElement.classList.add(this._inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(this._errorClass);
//   }

//   // Method to hide input errors
//   _hideInputError(inputElement) {
//     const errorElement = this._formElement.querySelector(
//       `#${inputElement.id}-error`
//     );
//     inputElement.classList.remove(this._inputErrorClass);
//     errorElement.classList.remove(this._errorClass);
//     errorElement.textContent = "";
//   }

//   // Check if the input is valid
//   _checkInputValidity(inputElement) {
//     if (!inputElement.validity.valid) {
//       this._showInputError(inputElement, inputElement.validationMessage);
//     } else {
//       this._hideInputError(inputElement);
//     }
//   }

//   // Method to toggle button state based on input validity
//   toggleButtonState() {
//     const isValid = this._inputs.every((input) => input.validity.valid);
//     if (isValid) {
//       this._submitButton.classList.remove(this._inactiveButtonClass);
//       this._submitButton.removeAttribute("disabled");
//     } else {
//       this._submitButton.classList.add(this._inactiveButtonClass);
//       this._submitButton.setAttribute("disabled", "true");
//     }
//   }

//   // Set up event listeners for form validation
//   _setEventListeners() {
//     this._inputs.forEach((input) => {
//       input.addEventListener("input", () => {
//         this._checkInputValidity(input);
//         this.toggleButtonState(); // Update the button state based on input validity
//       });
//     });
//   }

//   // Enable validation
//   enableValidation() {
//     this._setEventListeners();
//     this.toggleButtonState(); // Check the initial button state when the page loads
//   }
// }

// export default FormValidator;
