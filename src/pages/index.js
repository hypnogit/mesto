import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { validationConfig } from "../utils/validationConfig.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { buttonEditProfile, profilePopupName, profilePopupJob, cardAddButton, cardAddForm,
  cardAddName, cardAddLink, apiConfig, updateAvatarForm, updateAvatarButton } from "../utils/constants.js";


import './index.css';

// Прокидываем хендлинг попапа просмотра карточки в класс создания карточки
const openCardFullScreen = (name, link) => {
  popupZoomCard.open(name, link);
}

// Создаем инстанс класса запросов
const api = new Api(apiConfig);

// Создаем инстанс класса Section
const cardsSection = new Section({
  renderer: (cardData) => {
    cardsSection.addItem(createCard(cardData));
  }
}, '.elements')

// Создаем новую карточку
const createCard = (cardData) => {
  const card = new Card({
    data: cardData,
    userId,
    handleCardClick: () => {
      openCardFullScreen(cardData.name, cardData.link)
    },
    handleLikeClick: (id) => {
      if (card.isLiked()) {
        api.unlikeCard(id)
          .then(updatedCard => {
            card.setLikes(updatedCard.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else {
        api.likeCard(id)
          .then(updatedCard => {
            card.setLikes(updatedCard.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleDeleteIconClick: (id) => {
      popupDeleteCard.open();
      popupDeleteCard.setHandleConfirmation(() => {
        api.removeMyCard(id)
          .then(res => {
              card.deleteMyCard();
              popupDeleteCard.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
    }, '.template');
  return card.generateCard();
};

let userId = '';

// Собираем инфу для начальной загрузки страницы
api.getInitialInfo()
  .then(initialData => {
    const initialCardList = initialData[0];
    initialCardList.reverse();
    const initialUserInfo = initialData[1];
    userId = initialUserInfo._id;
    cardsSection.renderFinal(initialCardList);
    userInfo.setUserInfo(initialUserInfo);
  })

// Создаем инстанс валидатора попапа профиля
const profilePopupFormValidator = new FormValidator(validationConfig, '.profile-popup__content');

// Создаем инстанс валидатора попапа создания новой карточки
const cardFormValidator = new FormValidator(validationConfig, '.add-mesto-popup__content');

// Создаем инстанс валидатора попапа обновления аватара
const updatePopupValidator = new FormValidator(validationConfig, '.update-avatar-popup__content');

// Создаем инстанс хендлера инфы о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__job',
  avatarSelector: '.profile__edit-avatar-button'
});

// Создаем инстанс попапа профиля
const popupProfile = new PopupWithForm('.profile-popup', (userData) => {
  popupProfile.renderLoadingText(true);
  api.editUserInfo(userData.name, userData.about)
    .then(updatedUserInfo => {
        userInfo.setUserInfo(updatedUserInfo);
        popupProfile.renderLoadingText(false)
        popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
});

// Создаем инстанс попапа добавления новой карточки
const popupAddCard = new PopupWithForm('.add-mesto-popup', () => {
  popupAddCard.renderLoadingText(true);
  handleAddCardPopupSubmit();
  popupAddCard.renderLoadingText(false);
});

// Создаем инстанс попапа подтверждения удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.deletion-confirm-popup');

// Создаем инстанс попапа обновления аватара
const popupUpdateAvatar = new PopupWithForm('.update-avatar-popup', (src) => {
  popupUpdateAvatar.renderLoadingText(true);
  api.editAvatar(src.avatar)
    .then(updatedUserData => {
      userInfo.setUserInfo(updatedUserData);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupUpdateAvatar.renderLoadingText(false))
  popupUpdateAvatar.close();
});

// Создаем инстанс попапа просмотра карточки
const popupZoomCard = new PopupWithImage('.view-mesto-popup');

// Вешаем лисенеры на все виды попапов
popupZoomCard.setEventListeners();
popupProfile.setEventListeners();
popupAddCard.setEventListeners();
popupDeleteCard.setEventListeners();
popupUpdateAvatar.setEventListeners();

// Хендлим сабмит в попапе добавления карточки
const handleAddCardPopupSubmit = () => {
  api.addNewCard(cardAddName.value, cardAddLink.value)
    .then(newCardData => {
        cardsSection.addItem(createCard(newCardData));
        popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Заполняем форму профиля
function fillProfileInfoForm() {
  const userData = userInfo.getUserInfo();
  profilePopupName.value = userData.name;
  profilePopupJob.value = userData.about;
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

// Открываем попап обновления аватара, ресетаем форму и очищаем зависшие ошибки валидации
const handleUpdateAvatarPopupOpening = () => {
  updatePopupValidator.resetValidation();
  updateAvatarForm.reset();
  popupUpdateAvatar.open();
}

// Вешаем лисенер на открывание попапа профиля
buttonEditProfile.addEventListener('click', handleProfilePopupOpening);

// Открываем попап создания новой карточки и очищаем зависшие ошибки валидации
cardAddButton.addEventListener('click', handleAddCardPopupOpening);

// Открываем попап обновления аватара и очищаем зависшие ошибки валидации
updateAvatarButton.addEventListener('click', handleUpdateAvatarPopupOpening);

// Запускаем валидации
profilePopupFormValidator.enableValidation();
cardFormValidator.enableValidation();
updatePopupValidator.enableValidation();
