// template and its container
const newElementTemplate = document.querySelector('#new-element-template');
const elementsContainer = document.querySelector('.elements__container');
// popups
const allPopups = document.querySelectorAll('.popup');
// popup to edit profie
const profileEditPopup = document.querySelector('.popup_type_edit-profile');
const openProfileEditPopup = document.querySelector('.profile__edit-button');
const profileEditForm = document.querySelector('.form_edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileNameInput = document.querySelector('.form__input_edit_name');
const profileJobInput = document.querySelector('.form__input_edit_job');
// popup to add new elements
const newElementAddPopup = document.querySelector('.popup_type_add-elements');
const openNewElementAddPopup = document.querySelector('.profile__add-button');
const newElementAddForm = document.querySelector('.form_add');
const newElementNameInput = document.querySelector('.form__input_add_name');
const newElementLinkInput = document.querySelector('.form__input_add_link');
// popup to open large image
const openLargeImagePopup = document.querySelector('.popup_type_open-image');
// button to close popup
const closePopups = document.querySelectorAll('.popup__close-button');

// add template instead of elements
const createNewElement = (name, link) => {
    const newElement = newElementTemplate.content.querySelector('.new-element').cloneNode(true);
    const newElementTitle = newElement.querySelector('.new-element__title');
    const newElementImage = newElement.querySelector('.new-element__image');
    const likeNewElement = newElement.querySelector('.new-element__like-button');
    const deleteNewElement = newElement.querySelector('.new-element__delete-button');
    const largeImage = document.querySelector('.popup__large-image');
    const largeImageCaption = document.querySelector('.popup__large-caption');

    newElementTitle.textContent = name;
    newElementTitle.alt = name;
    newElementImage.src = link;

    // like new element
    likeNewElement.addEventListener('click', (evt) => {
        evt.target.classList.toggle('new-element__like-button_active');
    });

    // delete new element
    deleteNewElement.addEventListener('click', () => {
        newElement.remove();
    });

    // open large image pupup
    newElementImage.addEventListener('click', () => {
        openPopup(openLargeImagePopup);

        largeImage.src = link;
        largeImage.alt = name;
        largeImageCaption.textContent = name;
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

// submit to add new element
const submitNewElementAddForm = (evt) => {
    evt.preventDefault();
    const name = newElementNameInput.value;
    const link = newElementLinkInput.value;
    addNewElement(name, link);
    closePopup(newElementAddPopup);
    newElementAddForm.reset();

    evt.submitter.classList.add('popup__submit-button_inactive');
};

newElementAddForm.addEventListener('submit', submitNewElementAddForm);

// open popup
const openPopup = popup => {
    popup.classList.add('popup_opened');
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
};

closePopups.forEach(button => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

// submit to edit profile 
const submitProfileEditForm = evt => {
    evt.preventDefault();

    profileTitle.textContent = profileNameInput.value;
    profileSubtitle.textContent = profileJobInput.value;

    closePopup(profileEditPopup);
}

profileEditForm.addEventListener('submit', submitProfileEditForm);