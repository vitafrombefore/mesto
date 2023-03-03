import { openPopup, openLargeImagePopup, largeImageCaption, largeImage } from './index.js';

export class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
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
        this._setEventListeners();

        this._element.querySelector('.new-element__title').textContent = this._name;
        this._element.querySelector('.new-element__title').alt = this._name;
        this._element.querySelector('.new-element__image').src = this._link;

        return this._element;
    };

    // метод добавления и удаления лайка на карточке
    _likeCard() {
        this._element.querySelector('.new-element__like-button').classList.toggle('new-element__like-button_active');
    };

    // метод удаления карточки
    _deleteCard() {
        const card = this._element.querySelector('.new-element__delete-button').closest('.new-element');
        card.remove();
    };

    // метод открытия попапа с полноразмерным изображением 
    _openLargeImagePopup() {
        openPopup(openLargeImagePopup);

        largeImageCaption.textContent = this._name;
        largeImage.alt = this._name;
        largeImage.src = this._link;
    };

    // метод добавления слушателей событий
    _setEventListeners() {
        this._element.querySelector('.new-element__like-button').addEventListener('click', () => {
            this._likeCard();
        });
        this._element.querySelector('.new-element__delete-button').addEventListener('click', () => {
            this._deleteCard();
        });
        this._element.querySelector('.new-element__image').addEventListener('click', () => {
            this._openLargeImagePopup(this._name, this._link);
        });
    };
};






