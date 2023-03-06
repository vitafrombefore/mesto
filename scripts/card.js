/* import { openPopup, openLargeImagePopup, largeImageCaption, largeImage } from './index.js'; */

export class Card {
    constructor(name, link, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    };

    // метод получения разметки
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.new-element')
            .cloneNode(true);

        return cardElement;
    };

    // метод публикации карточки
    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.new-element__image');
        this._cardName = this._element.querySelector('.new-element__title');
        this._likeButton = this._element.querySelector('.new-element__like-button');
        this._deleteButton = this._element.querySelector('.new-element__delete-button');

        this._cardName.textContent = this._name;
        this._cardImage.alt = this._name;
        this._cardImage.src = this._link;
        this._setEventListeners();

        return this._element;
    };

    // метод добавления и удаления лайка на карточке
    _likeCard() {
        this._likeButton.classList.toggle('new-element__like-button_active');
    };

    // метод удаления карточки
    _deleteCard() {
        this._element.remove();
    };

   /* // метод открытия попапа с полноразмерным изображением
    _openLargeImagePopup() {
        openPopup(openLargeImagePopup);

        largeImageCaption.textContent = this._name;
        largeImage.alt = this._name;
        largeImage.src = this._link;
    }; */

    // метод добавления слушателей событий
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._likeCard();
        });

        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    };
};






