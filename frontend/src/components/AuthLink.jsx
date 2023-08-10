import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export function AuthLink({ onExit }) {
    const [link, setLink] = React.useState({ path: '', text: '' });
    const location = useLocation();
    React.useEffect(() => {
        if (location.pathname === '/sign-up') {
            setLink({ path: 'sign-in', text: 'Войти' });
            return;
        }
        if (location.pathname === '/sign-in') {
            setLink({ path: 'sign-up', text: 'Регистрация' });
            return;
        }

        setLink({ path: 'sign-in', text: 'Выйти' });
    }, [location.pathname]);

    return (
        <Link
            to={link.path}
            className='opacity log-in-out'
            onClick={location.pathname === '/' && onExit}
        >
            {link.text}
        </Link>
    );
}
