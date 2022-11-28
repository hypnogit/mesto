import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { conf } from "../components/conf.js";
import { initialCards } from "../components/initialCards.js"
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";

import './index.css';

const avatar = new URL('../images/avatar.png', import.meta.url);
const cross = new URL('../images/cross.svg', import.meta.url);
const earnslaw = new URL('../images/earnslaw.jpg', import.meta.url)
const hoffell = new URL('../images/hoffell.jpg', import.meta.url)
const like = new URL('../images/like.svg', import.meta.url)
const logo = new URL('../images/logo.svg', import.meta.url)
const moab = new URL('../images/moab.jpg', import.meta.url)
const nolike = new URL('../images/nolike.svg', import.meta.url)
const pencil = new URL('../images/pencil.svg', import.meta.url)
const plus = new URL('../images/plus.svg', import.meta.url)
const queenstown = new URL('../images/queenstown.jpg', import.meta.url)
const remove = new URL('../images/remove.svg', import.meta.url)
const reykholt = new URL('../images/reykholt.jpg', import.meta.url)
const silverthorne = new URL('../images/silverthorne.jpg', import.meta.url)

const buttonEditProfile = document.querySelector('.profile__edit-info');
const profilePopupName = document.querySelector('.profile-popup__input_type_name');
const profilePopupJob = document.querySelector('.profile-popup__input_type_job');
const profileForm = document.querySelector('.profile-popup__content');
const cardAddButton = document.querySelector('.profile__add-element');
const cardAddForm = document.querySelector('.add-mesto-popup__content');
const cardAddName = document.querySelector('.add-mesto-popup__input_type_mesto');
const cardAddLink = document.querySelector('.add-mesto-popup__input_type_image');
const profilePopupFormValidator = new FormValidator(conf, '.profile-popup__content');
const addCardPopupFormValidator = new FormValidator(conf, '.add-mesto-popup__content');
const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__job'
});
const popupProfile = new PopupWithForm('.profile-popup', (data) => {
  userInfo.setUserInfo(data);
});
const popupAddCard = new PopupWithForm('.add-mesto-popup', (data) => {
  const cardElement = new Card(data.name, data.link, '.template', openCardFullScreen);
  const card = cardElement.generateCard();
  defaultCardList.addItem(card);
});

// Заполняем форму профиля
function fillProfileInfoForm() {
  profilePopupName.value = userInfo.getUserInfo().name;
  profilePopupJob.value = userInfo.getUserInfo().job;
}

// Прокидываем хендлинг попапа просмотра карточки в класс создания карточки
const openCardFullScreen = (name, link) => {
  const popupZoomCard = new PopupWithImage('.view-mesto-popup', link, name);
  popupZoomCard.open();
}

// Рендерим начальные карточки
const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = new Card(item.name, item.link, '.template', openCardFullScreen);
    const card = cardElement.generateCard();
    defaultCardList.addItem(card);
  }
}, '.elements')
defaultCardList.renderFinal();

// Открываем попап профиля, перезаполняем форму и очищаем зависшие ошибки валидации
buttonEditProfile.addEventListener('click', () => {
  profilePopupFormValidator.resetValidation();
  popupProfile.open();
  fillProfileInfoForm();
});

// Сабмитим форму профиля и закрываем попап
profileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  userInfo.setUserInfo({
    name: profilePopupName.value,
    job: profilePopupJob.value
  })
  popupProfile.close();
});

// Открываем попап создания новой карточки и очищаем зависшие ошибки валидации
cardAddButton.addEventListener('click', () => {
  addCardPopupFormValidator.resetValidation();
  cardAddForm.reset();
  popupAddCard.open();
});

// Сабмитим форму создания новой карточки и закрываем попап
cardAddForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCard = new Section({
    items: [{
      name: cardAddName.value,
      link: cardAddLink.value
    }],
    renderer: (item) => {
      const cardElement = new Card(item.name, item.link, '.template', openCardFullScreen);
      const card = cardElement.generateCard();
      defaultCardList.addItem(card);
    }
  }, '.elements')
  newCard.renderFinal();
  popupAddCard.close();
});

// Запускаем валидации
profilePopupFormValidator.enableValidation();

addCardPopupFormValidator.enableValidation();
