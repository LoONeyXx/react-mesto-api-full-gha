import useFormAndValidation from '../hooks/useFormAndValidation';
import Form from './Form';
import Input from './Input';
import SubmitButton from './SubmitButton';
function FormAuth({ submitText, onSubmit, isLoading }) {
    const { values, handleChangeInput } = useFormAndValidation({
        email: '',
        password: '',
    });
    function handleSubmit() {
        onSubmit(values);
    }
    return (
        <Form
            name='authorization'
            onSubmit={handleSubmit}
        >
            <Input
                value={values.email}
                handleChangeInput={handleChangeInput}
                nameClass='authorization'
                nameInput='email'
                placeholder='Email'
                type='email'
            />
            <Input
                value={values.password}
                handleChangeInput={handleChangeInput}
                nameClass='authorization'
                nameInput='password'
                placeholder='Пароль'
                type='password'
            />
            <SubmitButton
                loadingMessage={'Проверка...'}
                submitText={submitText}
                name='authorization'
                isValid={true}
                isLoading={isLoading}
            />
        </Form>
    );
}
export default FormAuth;
