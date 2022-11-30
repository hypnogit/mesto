class Card {
  constructor({ name, link }, template, handleImageClick) {
    this._name = name;
    this._image = link;
    this._template = template;
    this._handleImageClick = handleImageClick;
  }

  generateCard() {
    this._getTemplate();
    this._cardImage = this._card.querySelector('.element__image');
    this._bindDeleteHandler();
    this._bindLikeHandler();
    this._bindImageClickHandler();
    this._cardImage.setAttribute('src', this._image);
    this._cardImage.setAttribute('alt', this._name);
    this._card.querySelector('.element__name').textContent = this._name;
    return this._card;
  }

  _getTemplate() {
    this._card = document.querySelector(this._template).content.cloneNode(true);
  }

  _bindDeleteHandler() {
    this._cardDeleteButton = this._card.querySelector('.element__remove');
    this._cardDeleteButton.addEventListener('click', () => {
      this._cardDeleteButton.closest('.element').remove();
    });
  }

  _bindLikeHandler() {
    this._cardLikeButton = this._card.querySelector('.element__like');
    this._cardLikeButton.addEventListener('click', () => {
      this._cardLikeButton.classList.toggle('element__like_active');
    });
  }

  _bindImageClickHandler() {
    this._cardImage.addEventListener('click', () => {
      this._handleImageClick(this._name, this._image);
    })
  }
}

export { Card }
