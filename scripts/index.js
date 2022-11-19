import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { conf } from "./conf.js";
import { initialCards } from "./initialCards.js"

const profilePopup = document.querySelector('.profile-popup');
const buttonEditProfile = document.querySelector('.profile__edit-info');
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
const cardAddForm = document.querySelector('.add-mesto-popup__content');
const cardAddName = document.querySelector('.add-mesto-popup__input_type_mesto');
const cardAddLink = document.querySelector('.add-mesto-popup__input_type_image');
const cardViewPopup = document.querySelector('.view-mesto-popup');
const profilePopupFormValidator = new FormValidator(conf, '.profile-popup__content');
const addCardPopupFormValidator = new FormValidator(conf, '.add-mesto-popup__content');
const closeButtons = document.querySelectorAll('.popup__close');

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
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
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

// Создаем новую карточку
const createCard = (item) => {
  const cardElement = new Card(item.name, item.link, '.template', openCardFullScreen);
  const card = cardElement.generateCard();
  return card;
}

// Рендерим начальные карточки
initialCards.forEach((item => {
  renderCard(createCard(item));
}));

// Открываем попап профиля, перезаполняем форму и очищаем зависшие ошибки валидации
buttonEditProfile.addEventListener('click', () => {
  profilePopupFormValidator.resetValidation();
  openPopup(profilePopup);
  fillProfileInfoForm();
});

// Закрываем все попапы крестиком
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  })
})

// Сабмитим форму профиля и закрываем попап
profileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileJob.textContent = profilePopupJob.value;
  profileName.textContent = profilePopupName.value;
  closePopup(profilePopup);
});

// Открываем попап создания новой карточки и очищаем зависшие ошибки валидации
cardAddButton.addEventListener('click', () => {
  addCardPopupFormValidator.resetValidation();
  cardAddForm.reset();
  openPopup(cardAddPopup);
});

// Сабмитим форму создания новой карточки и закрываем попап
cardAddForm.addEventListener('submit', function (e) {
  e.preventDefault();
  renderCard(createCard({
    name: cardAddName.value,
    link: cardAddLink.value
  }));
  cardAddForm.reset();
  closePopup(cardAddPopup);
});

// Запускаем валидации
profilePopupFormValidator.enableValidation();

addCardPopupFormValidator.enableValidation();
