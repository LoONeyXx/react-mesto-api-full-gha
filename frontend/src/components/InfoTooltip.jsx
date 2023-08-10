import React from 'react';
import ImagePopup from './ImagePopup';
function InfoTooltip({ name, logo, onClose, isOpen }) {
    return (
        <ImagePopup
            name='info'
            card={{ name: name, link: logo }}
            onClose={onClose}
            isOpen={isOpen}
        />
    );
}
export default InfoTooltip;
