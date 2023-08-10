import React from 'react';
import FormAuth from './FormAuth';

function Login({ onSubmit, isLoading }) {
    return (
        <section className='login'>
            <h2 className='login__title'>Войти</h2>
            <FormAuth
                name='authorization'
                onSubmit={onSubmit}
                submitText='Войти'
                isLoading={isLoading}
            />
        </section>
    );
}
export default Login;
