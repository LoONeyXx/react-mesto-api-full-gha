import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import useFormAndValidation from '../hooks/useFormAndValidation';
import Input from './Input';
import SubmitButton from './SubmitButton';
const EditProfilePopup = React.memo(function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
    const currentUser = React.useContext(CurrentUserContext);
    const { values, handleChangeInput, errorMessages, isValid, resetForm } = useFormAndValidation({
        name: '',
        about: '',
    });

    function handleSubmit(e) {
        onUpdateUser(values);
    }

    React.useEffect(() => {
        if (!isOpen && currentUser.name) {
            resetForm(currentUser, {}, true);
        }
    }, [currentUser, isOpen, resetForm]);

    return (
        <PopupWithForm
            name='editProfile'
            isOpen={isOpen}
            onClose={onClose}
            title='Редактировать профиль'
            onSubmit={handleSubmit}
        >
            <Input
                value={values.name}
                errorMessage={errorMessages.name}
                handleChangeInput={handleChangeInput}
                nameClass='popup'
                nameInput='name'
                placeholder='Название'
                minLength='2'
                maxLength='30'
                required={true}
            />
            <Input
                value={values.about}
                errorMessage={errorMessages.about}
                handleChangeInput={handleChangeInput}
                nameClass='popup'
                nameInput='about'
                placeholder='Ссылка на картинку'
                minLength='2'
                maxLength='30'
                required={true}
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
export default EditProfilePopup;
