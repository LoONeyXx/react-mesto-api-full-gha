import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';
import Input from './Input';
import SubmitButton from './SubmitButton';

const AddCardPopup = React.memo(function AddCardPopup({ isOpen, onClose, onAddCard, isLoading }) {
    const { values, handleChangeInput, errorMessages, isValid, resetForm } = useFormAndValidation({
        name: '',
        link: '',
    });
    function handleSubmit(e) {
        onAddCard(values);
    }
    React.useEffect(() => {
        if (!isOpen) {
            resetForm({
                name: '',
                link: '',
            });
        }
    }, [isOpen, resetForm]);

    return (
        <PopupWithForm
            name='addCard'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title='Новое место'
        >
            <Input
                value={values.name}
                errorMessage={errorMessages.name}
                handleChangeInput={handleChangeInput}
                nameClass='popup'
                nameInput='name'
                type='text'
                placeholder='Название'
                minLength='2'
                maxLength='30'
                required={true}
            />
            <Input
                value={values.link}
                errorMessage={errorMessages.link}
                handleChangeInput={handleChangeInput}
                nameClass='popup'
                nameInput='link'
                type='url'
                placeholder='Ссылка на картинку'
                required={true}
            />
            <SubmitButton
                name='popup'
                isLoading={isLoading}
                isValid={isValid}
                loadingMessage={'Создается..'}
                submitText='Создать'
            ></SubmitButton>
        </PopupWithForm>
    );
});
export default AddCardPopup;
