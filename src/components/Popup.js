class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');
    this._handleEscCloseThisBinded = this._handleEscClose.bind(this);
    this._handleOverlayClickThisBinded = this._handleOverlayClick.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscCloseThisBinded);
  }

  close() {
    this.removeEventListeners();
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    });
    this._popup.addEventListener('click', this._handleOverlayClickThisBinded);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscCloseThisBinded);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }
}

export { Popup }
