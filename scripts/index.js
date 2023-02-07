// default new elements
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

const elementsContainer = document.querySelector('.elements__container');
const newElementAddForm = document.querySelector('.popup__form_add');
const newElementNameInput = document.querySelector('.popup__input_add_name');
const newElementLinkInput = document.querySelector('.popup__input_add_link');
const newElementTemplate = document.querySelector('#new-element-template');

// add template instead of elements
const createNewElement = (name, link) => {
    const newElement = newElementTemplate.content.querySelector('.new-element').cloneNode(true);

    const newElementTitle = newElement.querySelector('.new-element__title');
    newElementTitle.textContent = name;

    const newElementImage = newElement.querySelector('.new-element__image');
    newElementImage.src = link;

    // like button 
    const likeButton = newElement.querySelector('.new-element__like-button');
    likeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('new-element__like-button_active');
    });

    // delete button
    const deleteButton = newElement.querySelector('.new-element__delete-button');
    deleteButton.addEventListener('click', () => {
        newElement.remove();
    });

    // open large image pupup
    const openLargeImage = document.querySelector('.popup__open-new-element');
    newElementImage.addEventListener('click', () => {
        openPopup(openLargeImage);

        const largeImage = document.querySelector('.popup__large-image');
        largeImage.src = newElementImage.src;

        const largeImageCaption = document.querySelector('.popup__large-caption');
        largeImageCaption.textContent = newElementTitle.textContent;
    });

    return newElement;
};

// add any new element
const addNewElement = (name, link) => {
    elementsContainer.prepend(createNewElement(name, link));
};

// add default new elements
initialCards.forEach((item) => {
    elementsContainer.append(createNewElement(item.name, item.link));
});

// submit form to add new elements
const handleAddFormSubmit = (evt) => {
    evt.preventDefault();
    const name = newElementNameInput.value;
    const link = newElementLinkInput.value;
    addNewElement(name, link);
    closePopup(addElementsPopup);
    newElementNameInput.value = '';
    newElementLinkInput.value = '';
};

newElementAddForm.addEventListener('submit', handleAddFormSubmit);

// popups
const allPopups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('.popup__edit-profile');
const addElementsPopup = document.querySelector('.popup__add-elements');

// open edit and add popups
const popupOpenEditButton = document.querySelector('.profile__edit-button');
const popupOpenAddButton = document.querySelector('.profile__add-button');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileNameInput = document.querySelector('.popup__input_edit_name');
let profileJobInput = document.querySelector('.popup__input_edit_job');

const openPopup = popup => {
    popup.classList.add('popup_opened');
};

popupOpenEditButton.addEventListener('click', () => {
    openPopup(editProfilePopup);

    profileNameInput.value = profileTitle.textContent;
    profileJobInput.value = profileSubtitle.textContent;
});

popupOpenAddButton.addEventListener('click', () => openPopup(addElementsPopup));

// close all popups
const popupCloseButton = document.querySelectorAll('.popup__close-button');

const closePopup = popup => {
    popup.classList.remove('popup_opened');
};

popupCloseButton.forEach(button => {
    button.addEventListener('click', () => {
        closePopup(button.closest('.popup'));
    })
});

// submit form to edit profile 
let profileEditForm = document.querySelector('.popup__form_edit');

const handleEditFormSubmit = evt => {
    evt.preventDefault();

    profileTitle.textContent = profileNameInput.value;
    profileSubtitle.textContent = profileJobInput.value;

    closePopup(editProfilePopup);
}

profileEditForm.addEventListener('submit', handleEditFormSubmit)