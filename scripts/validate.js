// Инициализируем все валидации нужными классами
const conf = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.submit',
  inactiveButtonClass: 'popup__button-invalid',
  inputErrorClass: 'popup__type-error'
}

// Добавляем класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, conf) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  inputElement.classList.add(conf.inputErrorClass);
  errorElement.textContent = errorMessage;
};

// Удаляем класс с ошибкой
const hideInputError = (formElement, inputElement, conf) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(conf.inputErrorClass);
  errorElement.textContent = '';
};

// Проверяем валидность поля и показываем ошибку если не
const isValid = (formElement, inputElement, conf) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, conf);
  } else {
    hideInputError(formElement, inputElement, conf);
  }
};

// Вешаем лисенеры на инпуты
const setEventListeners = (formElement, conf) => {
  const inputList = Array.from(formElement.querySelectorAll(conf.inputSelector));
  const buttonElement = formElement.querySelector(conf.submitButtonSelector);;
  toggleButtonState(inputList, buttonElement, conf);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, conf);
      toggleButtonState(inputList, buttonElement, conf);
    });
  });
};

// Проверяем наличие хотя бы одного невалидного инпута
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// Переключаем состояния кнопки сабмита
const toggleButtonState = (inputList, buttonElement, conf) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(conf.inactiveButtonClass)
    buttonElement.setAttribute("disabled", true);
  }
  else {
    buttonElement.classList.remove(conf.inactiveButtonClass)
    buttonElement.removeAttribute("disabled");
  }
}

// Включаем все валидации
const enableValidation = (conf) => {
  const formList = Array.from(document.querySelectorAll(conf.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, conf);
  });
};

// Включаем кнопку сабмита попапа профиля
const enableProfilePopupSubmitButton = () => {
  const button = document.querySelector('.profile-popup__submit');
  button.classList.remove('popup__button-invalid');
  button.removeAttribute('disabled');
}

enableValidation(conf);
