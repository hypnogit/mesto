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

const profilePopupFormValidator = new FormValidator(validationConfig, '.profile-popup__content');
const cardFormValidator = new FormValidator(validationConfig, '.add-mesto-popup__content');
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});
const popupProfile = new PopupWithForm('.profile-popup', (data) => {
  userInfo.setUserInfo(data);
  popupProfile.close();
});
const popupAddCard = new PopupWithForm('.add-mesto-popup', () => {
  const newCard = new Section({
    items: [{
      name: cardAddName.value,
      link: cardAddLink.value
    }],
    renderer: (item) => {
      cardsSection.addItem(createCard(item));
    }
  }, '.elements')
  newCard.renderFinal();
  popupAddCard.close();
});
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

// Создаем новую карточку
const createCard = (item) => {
  const cardElement = new Card(item, '.template', openCardFullScreen);
  const card = cardElement.generateCard();
  return card;
}

// Прокидываем хендлинг попапа просмотра карточки в класс создания карточки
const openCardFullScreen = (name, link) => {
  popupZoomCard.open(name, link);
}

// Открываем попап профиля, перезаполняем форму и очищаем зависшие ошибки валидации
const handleProfilePopupOpening = () => {
  profilePopupFormValidator.resetValidation();
  popupProfile.open();
  fillProfileInfoForm();
}

// Рендерим начальные карточки
const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsSection.addItem(createCard(item));
  }
}, '.elements')
cardsSection.renderFinal();

// Вешаем лисенер на открывание попапа профиля
buttonEditProfile.addEventListener('click', handleProfilePopupOpening);

// Открываем попап создания новой карточки и очищаем зависшие ошибки валидации
cardAddButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardAddForm.reset();
  popupAddCard.open();
});

// Запускаем валидации
profilePopupFormValidator.enableValidation();

cardFormValidator.enableValidation();
