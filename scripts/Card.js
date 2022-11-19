class Card {
  constructor(name, image, template, openCardFullScreen) {
    this._name = name;
    this._image = image;
    this._template = template;
    this._openCardFullScreen = openCardFullScreen;
  }

  generateCard() {
    this._getTemplate();
    this._cardImage = this._card.querySelector('.element__image');
    this._handleCardDeletion();
    this._handleLikeButton();
    this._handleViewingPopup();
    this._cardImage.setAttribute('src', this._image);
    this._cardImage.setAttribute('alt', this._name);
    this._card.querySelector('.element__name').textContent = this._name;
    this._viewImage = this._cardImage.src;
    this._viewName = this._card.querySelector('.element__name').textContent;
    return this._card;
  }

  _getTemplate() {
    this._card = document.querySelector(this._template).content.cloneNode(true);
  }

  _handleCardDeletion() {
    this._cardDeleteButton = this._card.querySelector('.element__remove');
    this._cardDeleteButton.addEventListener('click', () => {
      this._cardDeleteButton.closest('.element').remove();
    });
  }

  _handleLikeButton() {
    this._cardLikeButton = this._card.querySelector('.element__like');
    this._cardLikeButton.addEventListener('click', () => {
      this._cardLikeButton.classList.toggle('element__like_active');
    });
  }

  _handleViewingPopup() {
    this._cardImage.addEventListener('click', () => {
      this._openCardFullScreen(this._viewName, this._viewImage);
    })
  }
}

export { Card }
