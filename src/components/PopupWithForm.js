import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmission) {
    super(popupSelector);
    this._handleFormSubmission = handleFormSubmission;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitButton = this._form.querySelector('.submit');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.id] = input.value;
    })
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmission(this._getInputValues());
    })
  }

  close() {
    this._form.reset();
    super.close();
  }

  renderLoadingText(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение..';
    }
    else {
      this._submitButton.textContent = 'Сохранить';
    }
  }
}

export { PopupWithForm }
