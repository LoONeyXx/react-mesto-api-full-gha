import React from 'react';

function SubmitButton({ isLoading, isValid, loadingMessage, submitText, name }) {
    return (
        <button
            className={`button form__submit form__submit_type_${name} no-highlight ${
                !isValid ? 'form__submit_disabled' : ''
            }`}
            type='submit'
            disabled={!isValid}
        >
            {isLoading ? loadingMessage : submitText}
        </button>
    );
}
export default SubmitButton;
