class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  close() {
    this.removeEventListeners();
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._closeButton = this._popup.querySelector('.popup__close');
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
    this._popup.addEventListener('click', (evt) => {
      this._handleClickClose(evt);
    });
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleClickClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }
}

export { Popup }
