let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-info');
let closePopup = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let popupName = document.querySelector('.popup__input-name');
let popupJob = document.querySelector('.popup__input-job');
let saveButton = document.querySelector('.popup__submit');

editButton.addEventListener('click', popupOpening);
editButton.addEventListener('click', nameFilling);
editButton.addEventListener('click', jobFilling);
closePopup.addEventListener('click', popupOpening);
saveButton.addEventListener('click', saveChanges);
window.addEventListener('keypress', function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    profileJob.textContent = popupJob.value;
    profileName.textContent = popupName.value;
    popup.classList.toggle('popup_opened');
    }
});

function popupOpening() {
  popup.classList.toggle('popup_opened');
}

function nameFilling() {
  popupName.value = profileName.textContent;
}

function jobFilling() {
  popupJob.value = profileJob.textContent;
}

function saveChanges() {
  profileJob.textContent = popupJob.value;
  profileName.textContent = popupName.value;
  popup.classList.toggle('popup_opened');
}
