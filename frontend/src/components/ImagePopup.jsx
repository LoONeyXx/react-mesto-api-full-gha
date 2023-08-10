import React from 'react';
import Popup from './Popup';

const ImagePopup = React.memo(function ImagePopup({ card, onClose, name, isOpen }) {
    return (
        <Popup
            name='image'
            isOpen={isOpen}
            onClose={onClose}
        >
            <figure className={`popup__figure popup__figure_type_${name}`}>
                <img
                    src={card.link}
                    alt={card.name}
                    className={`popup__image popup__image_type_${name}`}
                />
                <figcaption className={`popup__image-text popup__image-text_type_${name}`}>{card.name}</figcaption>
            </figure>
        </Popup>
    );
});

export default ImagePopup;
