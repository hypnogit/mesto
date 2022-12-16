export const buttonEditProfile = document.querySelector('.profile__edit-info');
export const profilePopupName = document.querySelector('.profile-popup__input_type_name');
export const profilePopupJob = document.querySelector('.profile-popup__input_type_job');
export const cardAddButton = document.querySelector('.profile__add-element');
export const cardAddForm = document.querySelector('.add-mesto-popup__content');
export const updateAvatarForm = document.querySelector('.update-avatar-popup__content');
export const updateAvatarButton = document.querySelector('.profile__avatar-overlay');
export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: '8f0b498f-1e88-4aae-945a-26a5ecabde6e',
    'Content-Type': 'application/json'
  }
};
