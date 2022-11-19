class FormValidator {
  constructor(conf, form) {
    this._conf = conf;
    this._form = form;
  }

  // Включаем все валидации
  enableValidation() {
    this._currentForm = document.querySelector(this._form);
    this._setEventListeners(this._currentForm);
  };

  // Хендлим зависшие валидации и состояние кнопки
  resetValidation() {
    this._toggleButtonState(this._inputList, this._buttonElement);

    this._inputList.forEach((inputElement) => {
      this._hideInputError(this._currentForm, inputElement);
    });
  };

   // Вешаем лисенеры на инпуты
  _setEventListeners(formElement) {
    this._inputList = Array.from(formElement.querySelectorAll(this._conf.inputSelector));
    this._buttonElement = formElement.querySelector(this._conf.submitButtonSelector);
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };

  // Проверяем валидность поля и показываем ошибку если не
  _isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  // Добавляем класс с ошибкой
  _showInputError(formElement, inputElement, errorMessage) {
    this._errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(this._conf.inputErrorClass);
    this._errorElement.textContent = errorMessage;
  };

  // Удаляем класс с ошибкой
  _hideInputError(formElement, inputElement) {
    this._errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._conf.inputErrorClass);
    this._errorElement.textContent = '';
  };

  // Переключаем состояния кнопки сабмита
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._conf.inactiveButtonClass)
      buttonElement.setAttribute("disabled", true);
    }
    else {
      buttonElement.classList.remove(this._conf.inactiveButtonClass)
      buttonElement.removeAttribute("disabled");
    }
  }

  // Проверяем наличие хотя бы одного невалидного инпута
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
}

export { FormValidator }
