import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { validationConfig } from "../utils/validationConfig.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { buttonEditProfile, profilePopupName, profilePopupJob, cardAddButton, cardAddForm, apiConfig, updateAvatarForm, updateAvatarButton } from "../utils/constants.js";


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
    // Прокидываем хендлер зума карточки
    handleCardClick: () => {
      openCardFullScreen(cardData.name, cardData.link)
    },
    // Прокидываем хендлер лайков
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
    // Прокидываем хендлер удаления карточки
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

// Создаем инстанс хендлера инфы о пользователе
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__job',
  avatarSelector: '.profile__edit-avatar-button'
});

let userId = '';

// Собираем инфу для начальной загрузки страницы
api.getInitialInfo()
  .then(([cards, userData]) => {
    const initialCardList = cards;
    initialCardList.reverse();
    const initialUserInfo = userData;
    userId = initialUserInfo._id;
    cardsSection.renderItems(initialCardList);
    userInfo.setUserInfo(initialUserInfo);
  })
  .catch((err) => {
    console.log(err);
  });


// Создаем инстансы всех валидаторов и включаем валидации
const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}
 enableValidation(validationConfig);

// Создаем инстанс попапа профиля
const popupProfile = new PopupWithForm('.profile-popup', (userData) => {
  popupProfile.renderLoadingText(true);
  api.editUserInfo(userData.name, userData.about)
    .then(updatedUserInfo => {
        userInfo.setUserInfo(updatedUserInfo);
        popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupProfile.renderLoadingText(false))
});

// Создаем инстанс попапа добавления новой карточки
const popupAddCard = new PopupWithForm('.add-mesto-popup', () => {
  handleAddCardPopupSubmit();
});

// Создаем инстанс попапа подтверждения удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.deletion-confirm-popup');

// Создаем инстанс попапа обновления аватара
const popupUpdateAvatar = new PopupWithForm('.update-avatar-popup', (src) => {
  popupUpdateAvatar.renderLoadingText(true);
  api.editAvatar(src.avatar)
    .then(updatedUserData => {
      userInfo.setUserInfo(updatedUserData);
      popupUpdateAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupUpdateAvatar.renderLoadingText(false))
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
  popupAddCard.renderLoadingText(true);
  const cardData = popupAddCard.getInputValues()
  api.addNewCard(cardData.mesto, cardData.link)
    .then(newCardData => {
        cardsSection.addItem(createCard(newCardData));
        popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupAddCard.renderLoadingText(false))
}

// Заполняем форму профиля
function fillProfileInfoForm() {
  const userData = userInfo.getUserInfo();
  profilePopupName.value = userData.name;
  profilePopupJob.value = userData.about;
}

// Открываем попап профиля, перезаполняем форму и очищаем зависшие ошибки валидации
const handleProfilePopupOpening = () => {
  formValidators['profile-popup__content'].resetValidation();
  popupProfile.open();
  fillProfileInfoForm();
}

// Открываем попап создания карточки, ресетаем форму и очищаем зависшие ошибки валидации
const handleAddCardPopupOpening = () => {
  formValidators['add-mesto-popup__content'].resetValidation();
  popupAddCard.open();
}

// Открываем попап обновления аватара, ресетаем форму и очищаем зависшие ошибки валидации
const handleUpdateAvatarPopupOpening = () => {
  formValidators['update-avatar-popup__content'].resetValidation();
  popupUpdateAvatar.open();
}

// Вешаем лисенер на открывание попапа профиля
buttonEditProfile.addEventListener('click', handleProfilePopupOpening);

// Открываем попап создания новой карточки и очищаем зависшие ошибки валидации
cardAddButton.addEventListener('click', handleAddCardPopupOpening);

// Открываем попап обновления аватара и очищаем зависшие ошибки валидации
updateAvatarButton.addEventListener('click', handleUpdateAvatarPopupOpening);
