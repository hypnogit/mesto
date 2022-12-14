class Card {
  constructor({ data, userId, handleCardClick, handleLikeClick, handleDeleteIconClick }, template) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._cardLikes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._template = template;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  isLiked() {
    const userAlreadyLikedCard = this._cardLikes.find(user => user._id === this._userId);
    return userAlreadyLikedCard;
  }

  setLikes(updatedLikes) {
    this._cardLikes = updatedLikes;
    this._likeCounter.textContent = this._cardLikes.length;

    if (this.isLiked()) {
      this._likeToggleOnHandler();
    }
    else {
      this._likeToggleOffHandler();
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    })
    this._buttonRemove.addEventListener('click', () => {
      this._handleDeleteIconClick(this._id);
    })
    this._likeIcon.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    })
  }

  _likeToggleOnHandler() {
    this._likeIcon.classList.add('element__like_active');
  }

  _likeToggleOffHandler() {
    this._likeIcon.classList.remove('element__like_active');
  }

  generateCard() {
    this._card = this._getTemplate();
    this._likeCounter = this._card.querySelector('.element__like-count');
    this._buttonRemove = this._card.querySelector('.element__remove');
    this._likeIcon = this._card.querySelector('.element__like');
    this._cardImage = this._card.querySelector('.element__image');
    this._cardNameElement = this._card.querySelector('.element__name');
    this._setEventListeners();
    this.setLikes(this._cardLikes);
    this._cardImage.setAttribute('src', this._cardLink);
    this._cardImage.setAttribute('alt', this._cardName);
    this._cardNameElement.textContent = this._cardName;
    if (this._ownerId !== this._userId) {
      this._buttonRemove.style.display = 'none';
    }

    return this._card;
  }

  deleteMyCard() {
    this._card.remove();
  }
}

export { Card }
