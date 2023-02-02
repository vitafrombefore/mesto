// popups
const allPopups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('.popup__edit-profile');
const addElementsPopup = document.querySelector('.popup__add-elements');

// open popups
const popupOpenEditButton = document.querySelector('.profile__edit-button');
const popupOpenAddButton = document.querySelector('.profile__add-button');

const openPopup = popup => {
    popup.classList.add('popup_opened');
};

popupOpenEditButton.addEventListener('click', () => {
    openPopup(editProfilePopup);

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
});

popupOpenAddButton.addEventListener('click', () => openPopup(addElementsPopup));

// close popups
const popupCloseButton = document.querySelectorAll('.popup__close-button');

const closePopup = popup => {
    popup.classList.remove('popup_opened');
};

popupCloseButton.forEach(button => {
    button.addEventListener('click', () => {
        closePopup(button.closest('.popup'));
    })
});

// edit profile popup
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileEditForm = document.querySelector('.popup__form_edit');
let nameInput = document.querySelector('.popup__input_edit_name');
let jobInput = document.querySelector('.popup__input_edit_job');

const handleFormSubmit = evt => {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    closePopup(editProfilePopup);
}

profileEditForm.addEventListener('submit', handleFormSubmit)