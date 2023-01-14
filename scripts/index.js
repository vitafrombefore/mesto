const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let formElement = popupElement.querySelector('.popup__edit-form');
let nameInput = formElement.querySelector('.popup__edit-name');
let jobInput = formElement.querySelector('.popup__edit-job');

const openPopup = function () {
    popupElement.classList.add('popup_active');
}

const closePopup = function () {
    popupElement.classList.remove('popup_active');
}

nameInput.value = profileTitle.textContent;
jobInput.value = profileSubtitle.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);