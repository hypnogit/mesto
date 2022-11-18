import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { conf } from "./conf.js";
import { initialCards } from "./initialCards.js"

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
const cardsContainer = document.querySelector('.elements');
const cardAddPopup = document.querySelector('.add-mesto-popup');
const cardAddButton = document.querySelector('.profile__add-element');
const cardAddClosePopup = document.querySelector('.add-mesto-popup__close');
const cardAddForm = document.querySelector('.add-mesto-popup__content');
const cardAddName = document.querySelector('.add-mesto-popup__input_type_mesto');
const cardAddLink = document.querySelector('.add-mesto-popup__input_type_image');
const cardViewPopup = document.querySelector('.view-mesto-popup');
const cardViewClosePopup = document.querySelector('.view-mesto-popup__close');
const cardAddSubmitButton = document.querySelector('.add-mesto-popup__submit');
const profilePopupNameError = document.querySelector('#name-error');
const profilePopupJobError = document.querySelector('#job-error');
const cardAddNameError = document.querySelector('#card-name-error');
const cardAddLinkError = document.querySelector('#card-link-error');
const profilePopupFormValidator = new FormValidator(conf, '.profile-popup__content');
const addCardPopupFormValidator = new FormValidator(conf, '.add-mesto-popup__content');

// Открываем попапы и вешаем лисенеры
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('click', closePopupByClick);
}

// Закрываем попапы и снимаем лисенеры
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('click', closePopupByClick);
}

// Рендерим карточку
function renderCard(card) {
  cardsContainer.prepend(card);
}

// Заполняем форму профиля
function fillProfileInfoForm() {
  profilePopupName.value = profileName.textContent;
  profilePopupJob.value = profileJob.textContent;
}

// Закрываем попап экскейпом
const closePopupByEsc = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

// Закрываем попап кликом вне
const closePopupByClick = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}

// Прокидываем хендлинг попапа просмотра карточки в класс создания карточки
const openCardFullScreen = (name, link) => {
  openPopup(cardViewPopup);
  cardImageView.setAttribute('src', link);
  cardImageView.setAttribute('alt', name);
  cardNameView.textContent = name;
}

// Рендерим начальные карточки
initialCards.forEach((item => {
  const cardElement = new Card(item.name, item.link, '.template', openCardFullScreen);
  const card = cardElement.generateCard();
  renderCard(card);
}));

// Открываем попап профиля, перезаполняем форму, очищаем зависшие ошибки валидации и включаем кнопку сабмита
buttonEditProfile.addEventListener('click', () => {
  profilePopupNameError.textContent = '';
  profilePopupJobError.textContent = '';
  profilePopupName.classList.remove('popup__type-error');
  profilePopupJob.classList.remove('popup__type-error');
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

// Открываем попап создания новой карточки и очищаем зависшие ошибки валидации
cardAddButton.addEventListener('click', () => {
  cardAddNameError.textContent = '';
  cardAddLinkError.textContent = '';
  cardAddName.classList.remove('popup__type-error');
  cardAddLink.classList.remove('popup__type-error');
  cardAddSubmitButton.classList.add('popup__button-invalid');
  cardAddSubmitButton.setAttribute('disabled', true);
  cardAddForm.reset();
  openPopup(cardAddPopup);
});

// Закрываем попап создания новой карточки
cardAddClosePopup.addEventListener('click', () => {
  closePopup(cardAddPopup);
});

// Сабмитим форму создания новой карточки и закрываем попап
cardAddForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const newCardElement = new Card(cardAddName.value, cardAddLink.value, '.template', openCardFullScreen);
  const newCard = newCardElement.generateCard();
  renderCard(newCard)
  cardAddForm.reset();
  closePopup(cardAddPopup);
});

// Закрываем попап просмотра карточки
cardViewClosePopup.addEventListener('click', () => {
  closePopup(cardViewPopup);
});

// Запускаем валидации
profilePopupFormValidator.enableValidation();

addCardPopupFormValidator.enableValidation();
