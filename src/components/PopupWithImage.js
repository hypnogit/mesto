import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImageView = this._popup.querySelector('.view-mesto-popup__image');
    this._cardNameView = this._popup.querySelector('.view-mesto-popup__name');
  }

  open(name, link) {
    super.open();
    this._cardImageView.src = link;
    this._cardImageView.alt = name;
    this._cardNameView.textContent = name;
  }
}

export { PopupWithImage }
