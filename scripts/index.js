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

// Рендерим начальные карточки
initialCards.forEach((item => {
  renderCard(createCard(item.name, item.link))
}));

// Открываем попап профиля и предзаполняем форму
buttonEditProfile.addEventListener('click', () => {
  openPopup(profilePopup);
  fillProfileInfoForm();
});

// Закрываем попап профиля
profileClosePopup.addEventListener('click', () => {
  closePopup(profilePopup);
});

// Сабмитим форму профиля и закрываем попап
profileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileJob.textContent = profilePopupJob.value;
  profileName.textContent = profilePopupName.value;
  closePopup(profilePopup);
});

// Открываем попап создания новой карточки
cardAddButton.addEventListener('click', () => {
  openPopup(cardAddPopup);
});

// Закрываем попап создания новой карточки
cardAddClosePopup.addEventListener('click', () => {
  closePopup(cardAddPopup);
});

// Сабмитим форму создания новой карточки и закрываем попап
cardAddForm.addEventListener('submit', function (e) {
  e.preventDefault();
  renderCard(createCard(cardAddName.value, cardAddLink.value))
  cardAddForm.reset();
  closePopup(cardAddPopup);
});

// Закрываем попап просмотра карточки
cardViewClosePopup.addEventListener('click', () => {
  closePopup(cardViewPopup);
});
