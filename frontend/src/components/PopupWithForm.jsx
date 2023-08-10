import React from 'react';
import Popup from './Popup';
import Form from './Form';

const PopupWithForm = React.memo(function PopupWithForm({ title, name, children, isOpen, onClose, onSubmit }) {
    return (
        <Popup
            name='form'
            isOpen={isOpen}
            onClose={onClose}
        >
            <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
            <Form
                name='popup'
                onSubmit={onSubmit}
            >
                {children}
            </Form>
        </Popup>
    );
});

export default PopupWithForm;
