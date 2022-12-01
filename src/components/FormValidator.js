class FormValidator {
  constructor(conf, formSelector) {
    this._conf = conf;
    this._formSelector = formSelector;
    this._currentForm = document.querySelector(this._formSelector);
    this._buttonElement = this._currentForm.querySelector(this._conf.submitButtonSelector);
    this._inputList = Array.from(this._currentForm.querySelectorAll(this._conf.inputSelector));
  }

  // Включаем все валидации
  enableValidation() {
    this._setEventListeners();
  };

  // Хендлим зависшие валидации и состояние кнопки
  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

   // Вешаем лисенеры на инпуты
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  // Проверяем валидность поля и показываем ошибку если не
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Добавляем класс с ошибкой
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._currentForm.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(this._conf.inputErrorClass);
    errorElement.textContent = errorMessage;
  };

  // Удаляем класс с ошибкой
  _hideInputError(inputElement) {
    const errorElement = this._currentForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._conf.inputErrorClass);
    errorElement.textContent = '';
  };

  // Переключаем состояния кнопки сабмита
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._conf.inactiveButtonClass)
      this._buttonElement.disabled = true;
    }
    else {
      this._buttonElement.classList.remove(this._conf.inactiveButtonClass)
      this._buttonElement.removeAttribute("disabled");
    }
  }

  // Проверяем наличие хотя бы одного невалидного инпута
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
}

export { FormValidator }
