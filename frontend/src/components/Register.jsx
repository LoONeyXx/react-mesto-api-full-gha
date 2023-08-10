import FormAuth from './FormAuth';
import { Link } from 'react-router-dom';
function Register({ onSubmit, isLoading }) {
    return (
        <section className='register'>
            <h2 className='register__title'>Регистрация</h2>
            <FormAuth
                name='authorization'
                onSubmit={onSubmit}
                submitText='Регистрация'
                isLoading={isLoading}
            />
            <p className='register__footer-info'>
                Уже зарегистрированы?{' '}
                <Link
                    to='/sign-in'
                    className='register__login-link'
                >
                    {' '}
                    Войти
                </Link>
            </p>
        </section>
    );
}
export default Register;
