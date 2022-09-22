let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-info');
let closePopup = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let popupName = document.querySelector('.popup__input_name');
let popupJob = document.querySelector('.popup__input_job');
let form = document.querySelector('.popup__content');

editButton.addEventListener('click', popupOpening);
closePopup.addEventListener('click', popupClosing);
form.addEventListener('submit', function (e) {
  e.preventDefault();
  profileJob.textContent = popupJob.value;
  profileName.textContent = popupName.value;
  popupClosing();
});

function popupOpening() {
  popup.classList.add('popup_opened');
  profileInfoFilling();
}

function popupClosing() {
  popup.classList.remove('popup_opened');
}

function profileInfoFilling() {
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
}
