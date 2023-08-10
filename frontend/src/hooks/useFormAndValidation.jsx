import { useState, useCallback } from 'react';

export default function useFormAndValidation(initializeValues) {
    const [values, setValues] = useState(initializeValues);
    const [errorMessages, setErrorMessages] = useState({});
    const [isValid, setValid] = useState(false);

    const handleChangeInput = useCallback(
        (e) => {
            const { name, value } = e.target;
            setValues({ ...values, [name]: value });
            setErrorMessages({ ...errorMessages, [name]: e.target.validationMessage });
            setValid(e.target.closest('form').checkValidity());
        },
        [values, errorMessages]
    );

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrorMessages(newErrors);
            setValid(newIsValid);
        },
        [setValues, setErrorMessages, setValid]
    );

    return { values, handleChangeInput, errorMessages, isValid, resetForm, setValues, setValid };
}
