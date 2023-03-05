export class FormValidator {
    constructor(data, formElement) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveSubmitButtonClass = data.inactiveSubmitButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._formElement = formElement;
    };

    // метод, который добавляет класс с ошибкой
    _showInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.classList.add(this._errorClass);
        this._errorElement.textContent = inputElement.validationMessage;
    };

    // метод, который удаляет класс с ошибкой
    _hideInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    };

    // метод, который проверяет валидность поля  
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        };
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    // метод переключения кнопки
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._inactiveSubmitButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._inactiveSubmitButtonClass);
            this._buttonElement.disabled = false;
        };
    };

    // метод, который добавляет обработчики полям форм
    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); 
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector); 

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {

                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    // метод, который добавляет обработчики формам
    enableValidation() {
        this._setEventListeners()
    }

    // метод очистки ошибок
    resetValidation() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }

    // метод активировации/деактивации кнопки сабмита
    disableButton() {
        this._buttonElement.classList.add('popup__submit-button_inactive');
        this._buttonElement.disabled = true;
    }
}
