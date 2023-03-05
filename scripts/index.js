import { initialCards } from './InitialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// селекторы элементов
const formValidationConfig = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveSubmitButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active',
};

// контейнер для новых карточек
const elementsContainer = document.querySelector('.elements__container');
// попапы
const allPopups = document.querySelectorAll('.popup');
// попап редактирования профиля
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const openProfileEditPopup = document.querySelector('.profile__edit-button');
const profileEditForm = document.forms["profile-edit-form"];
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileNameInput = document.querySelector('.form__input_edit_name');
const profileJobInput = document.querySelector('.form__input_edit_job');
// попап добавления новых карточек
const newElementAddPopup = document.querySelector('.popup_type_add-elements');
const openNewElementAddPopup = document.querySelector('.profile__add-button');
const newElementAddForm = document.forms["profile-add-form"];
const newElementNameInput = document.querySelector('.form__input_add_name');
const newElementLinkInput = document.querySelector('.form__input_add_link');
// попап с полноразмерным изображением 
const newElementImage = document.querySelector('.new-element__image');
const openLargeImagePopup = document.querySelector('.popup_type_open-image');
const largeImage = document.querySelector('.popup__large-image');
const largeImageCaption = document.querySelector('.popup__large-caption');
// кнопка закрытия попапа
const closePopups = document.querySelectorAll('.popup__close-button');

// добавление класса карточки вместо элементов
const createNewElement = (name, link) => {
    const card = new Card(name, link, '#new-element-template');
    const cardElement = card.generateCard();

    return cardElement;
};

// добавление любой новой карточки
const addNewElement = (name, link, elementsContainer) => {
    elementsContainer.prepend(createNewElement(name, link));
};

// добавление шести дефолтных карточек
initialCards.forEach((item) => {
    elementsContainer.append(createNewElement(item.name, item.link));
});

// подтверждение добавления новой карточки
const submitNewElementAddForm = (evt) => {
    evt.preventDefault();
    const name = newElementNameInput.value;
    const link = newElementLinkInput.value;
    addNewElement(name, link, elementsContainer);
    closePopup(newElementAddPopup);
    newElementAddForm.reset();
    newElementAddValidation.disableButton();
};

newElementAddForm.addEventListener('submit', submitNewElementAddForm);

// open popup
const openPopup = popup => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

// open popup to edit profile
openProfileEditPopup.addEventListener('click', () => {
    profileEditFormValidation.resetValidation();
    openPopup(profileEditPopup);

    profileNameInput.value = profileTitle.textContent;
    profileJobInput.value = profileSubtitle.textContent;
});

// open popup to add new element
openNewElementAddPopup.addEventListener('click', () => {
    newElementAddValidation.resetValidation();
    openPopup(newElementAddPopup);
});

// close popup
const closePopup = popup => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
};

closePopups.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

// close popup by overlay
const closePopupByClickOnOverlay = evt => {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    };
};

allPopups.forEach((popup) => {
    popup.addEventListener('click', closePopupByClickOnOverlay);
});

// close popup by esc
const closePopupByEsc = evt => {
    if (evt.key === 'Escape') {
        allPopups.forEach(closePopup);
    };
};

// submit to edit profile 
const submitProfileEditForm = evt => {
    evt.preventDefault();

    profileTitle.textContent = profileNameInput.value;
    profileSubtitle.textContent = profileJobInput.value;

    closePopup(profileEditPopup);
}

profileEditForm.addEventListener('submit', submitProfileEditForm);

// валидация формы редактирования профиля
const profileEditFormValidation = new FormValidator(formValidationConfig, profileEditForm);
profileEditFormValidation.enableValidation();

// валидация формы добавления новой карточки
const newElementAddValidation = new FormValidator(formValidationConfig, newElementAddForm);
newElementAddValidation.enableValidation();

// функция для открытия попапа с полноразмерным изображением
export const handleCardClick = (name, link) => {
    newElementImage.addEventListener('click', () => {
        openPopup(openLargeImagePopup);

        largeImageCaption.textContent = name;
        largeImage.alt = name;
        largeImage.src = link;
    });
};

/* export { openPopup, openLargeImagePopup, largeImageCaption, largeImage }; */