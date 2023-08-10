import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../hooks/useFormAndValidation';
import Input from './Input';
import SubmitButton from './SubmitButton';
const EditAvatarPopup = React.memo(function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
    const { values, handleChangeInput, errorMessages, isValid, resetForm } = useFormAndValidation({
        avatar: '',
    });

    function handleSubmit(e) {
        onUpdateAvatar(values);
    }

    React.useEffect(() => {
        if (!isOpen) {
            resetForm({ avatar: '' });
        }
    }, [isOpen, resetForm]);
    return (
        <PopupWithForm
            title='Обновить аватар'
            name='editAvatar'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <Input
                value={values.avatar}
                errorMessage={errorMessages.avatar}
                handleChangeInput={handleChangeInput}
                nameClass='popup'
                nameInput='avatar'
                placeholder='Ссылка на картинку'
                minLength='2'
                required={true}
                type='url'
            />
            <SubmitButton
                name='popup'
                isLoading={isLoading}
                isValid={isValid}
                loadingMessage={'Сохранение...'}
                submitText='Сохранить'
            ></SubmitButton>
        </PopupWithForm>
    );
});
export default EditAvatarPopup;
