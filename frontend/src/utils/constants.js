export const infoSelectors = {
    about: '.profile__subtitle',
    name: '.profile__title',
    avatar: '.profile__image',
};

export const apiOptions = {
    headers: {
        'Content-Type': 'application/json',
    },
    server: 'https://api.cardsplace.nomoreparties.co',
};

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error',
    errorActiveClass: 'popup__input-error_visible',
    fieldSetSelector: '.popup__input-group',
};

export const profileAvatarOverlay = document.querySelector('.profile__overlay');
export const profileBtnEdit = document.querySelector('.profile__btn-edit');
export const profileAddBtn = document.querySelector('.profile__btn-add');
