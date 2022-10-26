const profilePopup = document.querySelector('.profile-popup');
const buttonEditProfile = document.querySelector('.profile__edit-info');
const profileClosePopup = document.querySelector('.profile-popup__close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profilePopupName = document.querySelector('.profile-popup__input_type_name');
const profilePopupJob = document.querySelector('.profile-popup__input_type_job');
const profileForm = document.querySelector('.profile-popup__content');
const cardImageView = document.querySelector('.view-mesto-popup__image');
const cardNameView = document.querySelector('.view-mesto-popup__name');
const template = document.querySelector('.template');
const cards = document.querySelector('.elements');
const cardAddPopup = document.querySelector('.add-mesto-popup');
const cardAddButton = document.querySelector('.profile__add-element');
const cardAddClosePopup = document.querySelector('.add-mesto-popup__close');
const cardAddForm = document.querySelector('.add-mesto-popup__content');
const cardAddName = document.querySelector('.add-mesto-popup__input_type_mesto');
const cardAddLink = document.querySelector('.add-mesto-popup__input_type_image');
const cardViewPopup = document.querySelector('.view-mesto-popup');
const cardViewClosePopup = document.querySelector('.view-mesto-popup__close');
const cardAddPopupContainer = document.querySelector('.add-mesto-popup__container');
const cardAddSubmitButton = document.querySelector('.add-mesto-popup__submit');
const profilePopupSubmitButton = document.querySelector('.profile-popup__submit');
const profilePopupNameError = document.querySelector('#name-error');
const profilePopupJobError = document.querySelector('#job-error');

// Открываем попапы
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Закрываем попапы
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Создаем карточку
function createCard(cardName, cardImage) {
  // Получаем элементы
  const card = template.content.cloneNode(true);
  const cardImageDom = card.querySelector('.element__image');
  const cardNameDom = card.querySelector('.element__name');
  const cardLikeButton = card.querySelector('.element__like');
  const cardDeleteButton = card.querySelector('.element__remove');

  // Даём им присланные значения
  cardImageDom.setAttribute('src', cardImage);
  cardImageDom.setAttribute('alt', cardName);
  cardNameDom.textContent = cardName;

  // Вешаем слушатели
  cardDeleteButton.addEventListener('click', () => {
    cardDeleteButton.closest('.element').remove();
  });

  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('element__like_active');
  });

  cardImageDom.addEventListener('click', () => {
    openPopup(cardViewPopup);
    cardImageView.setAttribute('src', cardImageDom.getAttribute('src'));
    cardImageView.setAttribute('alt', cardImageDom.getAttribute('alt'));
    cardNameView.textContent = cardImageDom.getAttribute('alt');
    window.addEventListener('keydown', closeCardViewPopupByEscape);
    cardViewPopup.addEventListener('click', (evt) => {
      if (evt.target === cardViewPopup) {
        closePopup(cardViewPopup);
        window.removeEventListener('keydown', closeCardViewPopupByEscape);
      }
    })
  });

  return card;
}

// Рендерим карточку
function renderCard(card) {
  cards.prepend(card);
}

// Заполняем форму профиля
function fillProfileInfoForm() {
  profilePopupName.value = profileName.textContent;
  profilePopupJob.value = profileJob.textContent;
}

function closeCardViewPopupByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(cardViewPopup);
  }
}

function closeCardAddPopupByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(cardAddPopup);
  }
}

function closeProfilePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(profilePopup);
  }
}

// Рендерим начальные карточки
initialCards.forEach((item => {
  renderCard(createCard(item.name, item.link))
}));

// Открываем попап профиля, предзаполняем форму, сбрасываем валидации и закрываем попап профиля
buttonEditProfile.addEventListener('click', () => {
  openPopup(profilePopup);
  profilePopupSubmitButton.classList.remove('popup__button-invalid');
  profilePopupSubmitButton.removeAttribute('disabled');
  profilePopupNameError.classList.remove('active');
  profilePopupJobError.classList.remove('active');
  profilePopupName.classList.remove('popup__type-error');
  profilePopupJob.classList.remove('popup__type-error');
  fillProfileInfoForm();
  window.addEventListener('keydown', closeProfilePopupByEscape);
  profilePopup.addEventListener('click', (evt) => {
    if (evt.target === profilePopup) {
      closePopup(profilePopup);
      window.removeEventListener('keydown', closeProfilePopupByEscape);
    }
  })
});

// Закрываем попап профиля и снимаем лисенер
profileClosePopup.addEventListener('click', () => {
  closePopup(profilePopup);
  window.removeEventListener('keydown', closeProfilePopupByEscape);
});

// Сабмитим форму профиля, закрываем попап и снимаем лисенер
profileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileJob.textContent = profilePopupJob.value;
  profileName.textContent = profilePopupName.value;
  closePopup(profilePopup);
  window.removeEventListener('keydown', closeProfilePopupByEscape);
});

// Открываем попап создания новой карточки и сбрасываем валидации
cardAddButton.addEventListener('click', () => {
  openPopup(cardAddPopup);
  cardAddSubmitButton.classList.add('popup__button-invalid');
  cardAddSubmitButton.setAttribute('disabled', true);
  window.addEventListener('keydown', closeCardAddPopupByEscape);
  cardAddPopup.addEventListener('click', (evt) => {
    if (evt.target === cardAddPopup) {
      closePopup(cardAddPopup);
      window.removeEventListener('keydown', closeCardAddPopupByEscape);
    }
  })
});

// Закрываем попап создания новой карточки и убираем лисенер
cardAddClosePopup.addEventListener('click', () => {
  closePopup(cardAddPopup);
  window.removeEventListener('keydown', closeCardAddPopupByEscape);
});

// Сабмитим форму создания новой карточки, закрываем попап и убираем лисенер
cardAddForm.addEventListener('submit', function (e) {
  e.preventDefault();
  renderCard(createCard(cardAddName.value, cardAddLink.value))
  cardAddForm.reset();
  closePopup(cardAddPopup);
  window.removeEventListener('keydown', closeCardAddPopupByEscape);
});

// Закрываем попап просмотра карточки и убираем лисенер
cardViewClosePopup.addEventListener('click', () => {
  closePopup(cardViewPopup);
  window.removeEventListener('keydown', closeCardViewPopupByEscape);
});
