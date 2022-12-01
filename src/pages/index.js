import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { validationConfig } from "../utils/validationConfig.js";
import { initialCards } from "../utils/initialCards.js"
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { buttonEditProfile, profilePopupName, profilePopupJob, cardAddButton, cardAddForm,
  cardAddName, cardAddLink } from "../utils/constants.js";

import './index.css';

// Прокидываем хендлинг попапа просмотра карточки в класс создания карточки
const openCardFullScreen = (name, link) => {
  popupZoomCard.open(name, link);
}

// Создаем новую карточку
const createCard = (cardData) => {
  const cardElement = new Card(cardData, '.template', openCardFullScreen);
  const card = cardElement.generateCard();
  return card;
}

// Рендерим начальные карточки
const cardsSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    cardsSection.addItem(createCard(cardData));
  }
}, '.elements')
cardsSection.renderFinal();

// Создаем инстанс валидатора попапа профиля
const profilePopupFormValidator = new FormValidator(validationConfig, '.profile-popup__content');

// Создаем инстанс валидатора попапа создания новой карточки
const cardFormValidator = new FormValidator(validationConfig, '.add-mesto-popup__content');

// Создаем инстанс хендлера инфы о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});

// Создаем инстанс попапа профиля
const popupProfile = new PopupWithForm('.profile-popup', (userData) => {
  userInfo.setUserInfo(userData);
  popupProfile.close();
});

// Создаем инстанс попапа добавления новой карточки
const popupAddCard = new PopupWithForm('.add-mesto-popup', () => {
  cardsSection.addItem(createCard({
    name: cardAddName.value,
    link: cardAddLink.value
  }));
  popupAddCard.close();
});

// Создаем инстанс попапа просмотра карточки
const popupZoomCard = new PopupWithImage('.view-mesto-popup');

// Вешаем лисенеры на все виды попапов
popupZoomCard.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();

// Заполняем форму профиля
function fillProfileInfoForm() {
  const userData = userInfo.getUserInfo();
  profilePopupName.value = userData.name;
  profilePopupJob.value = userData.job;
}

// Открываем попап профиля, перезаполняем форму и очищаем зависшие ошибки валидации
const handleProfilePopupOpening = () => {
  profilePopupFormValidator.resetValidation();
  popupProfile.open();
  fillProfileInfoForm();
}

// Открываем попап создания карточки, ресетаем форму и очищаем зависшие ошибки валидации
const handleAddCardPopupOpening = () => {
  cardFormValidator.resetValidation();
  cardAddForm.reset();
  popupAddCard.open();
}

// Вешаем лисенер на открывание попапа профиля
buttonEditProfile.addEventListener('click', handleProfilePopupOpening);

// Открываем попап создания новой карточки и очищаем зависшие ошибки валидации
cardAddButton.addEventListener('click', handleAddCardPopupOpening);

// Запускаем валидации
profilePopupFormValidator.enableValidation();

cardFormValidator.enableValidation();
