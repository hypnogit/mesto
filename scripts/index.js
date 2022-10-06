let profilePopup = document.querySelector('.profile-popup');
let editButton = document.querySelector('.profile__edit-info');
let profileClosePopup = document.querySelector('.profile-popup__close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let profilePopupName = document.querySelector('.profile-popup__input_type_name');
let profilePopupJob = document.querySelector('.profile-popup__input_type_job');
let profileForm = document.querySelector('.profile-popup__content');

editButton.addEventListener('click', profilePopupOpening);
profileClosePopup.addEventListener('click', profilePopupClosing);
profileForm.addEventListener('submit', function (e) {
  e.preventDefault();
  profileJob.textContent = profilePopupJob.value;
  profileName.textContent = profilePopupName.value;
  profilePopupClosing();
});

function profilePopupOpening() {
  profilePopup.classList.add('profile-popup_opened');
  profileInfoFilling();
}

function profilePopupClosing() {
  profilePopup.classList.remove('profile-popup_opened');
}

function profileInfoFilling() {
  profilePopupName.value = profileName.textContent;
  profilePopupJob.value = profileJob.textContent;
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach((item) => {
  const cardName = item.name;
  const cardSrc = item.link;

  const elements = document.querySelector('.elements');
  const template = document.querySelector('.template');
  const element = template.content.cloneNode(true);

  const elementImage = element.querySelector('.element__image');
  elementImage.setAttribute('src', cardSrc);
  elementImage.setAttribute('alt', cardName);

  const elementDetails = element.querySelector('.element__details');
  const elementName = elementDetails.querySelector('.element__name');
  elementName.textContent = cardName;

  elements.append(element);
});

const addMestoPopup = document.querySelector('.add-mesto-popup');

const addMestoButton = document.querySelector('.profile__add-element');

const addMestoClosePopup = document.querySelector('.add-mesto-popup__close');

const addMestoForm = document.querySelector('.add-mesto-popup__content');

const addMestoName = document.querySelector('.add-mesto-popup__input_type_mesto');
const addMestoLink = document.querySelector('.add-mesto-popup__input_type_image');

addMestoButton.addEventListener('click', addMestoPopupOpening);
addMestoClosePopup.addEventListener('click', addMestoPopupClosing);
addMestoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const elements = document.querySelector('.elements');
  const template = document.querySelector('.template');
  const element = template.content.cloneNode(true);

  const elementImage = element.querySelector('.element__image');
  elementImage.setAttribute('src', addMestoLink.value);
  elementImage.setAttribute('alt', addMestoName.value);

  const elementDetails = element.querySelector('.element__details');
  const elementName = elementDetails.querySelector('.element__name');
  elementName.textContent = addMestoName.value;

  const elementLike = element.querySelector('.element__like');
  elementLike.addEventListener('click', () => {
    elementLike.classList.toggle('element__like_active');
  });

  const elementRemove = element.querySelector('.element__remove');
  elementRemove.addEventListener('click', () => {
    elementRemove.closest('.element').remove();
  });

  const mestoImage = document.querySelector('.view-mesto-popup__image');
  const mestoName = document.querySelector('.view-mesto-popup__name');

  elementImage.addEventListener('click', () => {
    viewMestoPopupOpening();
    mestoImage.setAttribute('src', elementImage.getAttribute('src'));
    mestoImage.setAttribute('alt', elementImage.getAttribute('alt'));
    mestoName.textContent = elementImage.getAttribute('alt');
  });

  elements.prepend(element);

  addMestoPopupClosing();
});

function addMestoPopupOpening() {
  addMestoPopup.classList.add('add-mesto-popup_opened');
  addMestoName.value = '';
  addMestoLink.value = '';
}

function addMestoPopupClosing() {
  addMestoPopup.classList.remove('add-mesto-popup_opened');
}

const elementLikes = document.querySelectorAll('.element__like');

elementLikes.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('element__like_active');
  })
});

const elementRemoves = document.querySelectorAll('.element__remove');

elementRemoves.forEach((item) => {
  item.addEventListener('click', () => {
    item.closest('.element').remove();
  })
});

const viewMestoPopup = document.querySelector('.view-mesto-popup');

function viewMestoPopupOpening() {
  viewMestoPopup.classList.add('view-mesto-popup_opened');
}

function viewMestoPopupClosing() {
  viewMestoPopup.classList.remove('view-mesto-popup_opened');
}

const viewMestoClosePopup = document.querySelector('.view-mesto-popup__close');
viewMestoClosePopup.addEventListener('click', viewMestoPopupClosing);

const mestoImages = document.querySelectorAll('.element__image');
const mestoImage = document.querySelector('.view-mesto-popup__image');
const mestoName = document.querySelector('.view-mesto-popup__name');

mestoImages.forEach((item) => {
  item.addEventListener('click', () => {
    viewMestoPopupOpening();
    mestoImage.setAttribute('src', item.getAttribute('src'));
    mestoImage.setAttribute('alt', item.getAttribute('alt'));
    mestoName.textContent = item.getAttribute('alt');
  })
});
