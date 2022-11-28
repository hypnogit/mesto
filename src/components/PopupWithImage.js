import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector, link, name) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._link = link;
    this._name = name;
  }

  open() {
    super.open();
    this._cardImageView = document.querySelector('.view-mesto-popup__image');
    this._cardNameView = document.querySelector('.view-mesto-popup__name');
    this._cardImageView.setAttribute('src', this._link);
    this._cardImageView.setAttribute('alt', this._name);
    this._cardNameView.textContent = this._name;
  }
}

export { PopupWithImage }
