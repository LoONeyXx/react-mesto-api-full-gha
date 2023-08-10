import React from 'react';

function Form({ children, name, onSubmit }) {
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit();
    }
    return (
        <form
            noValidate
            name={`form form_type_${name}`}
            action='#'
            className={`form form_type_${name}`}
            onSubmit={handleSubmit}
        >
            <fieldset className={`form__input-group form__input-group_type_${name}`}>{children}</fieldset>
        </form>
    );
}
export default Form;
