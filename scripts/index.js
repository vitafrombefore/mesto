import { initialCards } from './initial-cards.js';
import { Card } from './card.js';

// контейнер для новых карточек
const elementsContainer = document.querySelector('.elements__container');
// попапы
const allPopups = document.querySelectorAll('.popup');
// попап редактирования профиля
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const openProfileEditPopup = document.querySelector('.profile__edit-button');
const profileEditForm = document.querySelector('.form_edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileNameInput = document.querySelector('.form__input_edit_name');
const profileJobInput = document.querySelector('.form__input_edit_job');
// попап добавления новых карточек
const newElementAddPopup = document.querySelector('.popup_type_add-elements');
const openNewElementAddPopup = document.querySelector('.profile__add-button');
const newElementAddForm = document.querySelector('.form_add');
const newElementNameInput = document.querySelector('.form__input_add_name');
const newElementLinkInput = document.querySelector('.form__input_add_link');
// попап с полноразмерным изображением 
const openLargeImagePopup = document.querySelector('.popup_type_open-image');
const largeImage = document.querySelector('.popup__large-image');
const largeImageCaption = document.querySelector('.popup__large-caption');
// кнопка закрытия попапа
const closePopups = document.querySelectorAll('.popup__close-button');

// добавление класса карточки вместо элементов
const createNewElement = (data) => {
    const card = new Card(data, '#new-element-template');
    const cardElement = card.generateCard();

    return cardElement;
};

// добавление любой новой карточки
const addNewElement = (data, container) => {
   container.prepend(createNewElement(data));
};

// добавление шести дефолтных карточек
initialCards.forEach((item) => {
    addNewElement(item, elementsContainer);
});

// подтверждение добавления новой карточки
const submitNewElementAddForm = (evt) => {
    evt.preventDefault();
    const name = newElementNameInput.value;
    const link = newElementLinkInput.value;
    const data = {name, link};
    addNewElement(data, elementsContainer);
    closePopup(newElementAddPopup);
    newElementAddForm.reset();

    evt.submitter.classList.add('popup__submit-button_inactive');
    evt.submitter.disabled = true;
};

newElementAddForm.addEventListener('submit', submitNewElementAddForm);

// open popup
const openPopup = popup => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

// open popup to edit profile
openProfileEditPopup.addEventListener('click', () => {
    openPopup(profileEditPopup);

    profileNameInput.value = profileTitle.textContent;
    profileJobInput.value = profileSubtitle.textContent;
});

// open popup to add new element
openNewElementAddPopup.addEventListener('click', () => {
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

// close popup by overplay
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
        allPopups.forEach((popup) => {
            closePopup(popup);
        });
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

export { openPopup, openLargeImagePopup, largeImageCaption, largeImage }; 