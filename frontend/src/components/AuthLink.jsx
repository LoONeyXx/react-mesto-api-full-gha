import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export function AuthLink({ onExit }) {
    const [link, setLink] = React.useState({ path: '', text: '' });
    const location = useLocation();
    React.useEffect(() => {
        if (location.pathname === '/signup') {
            setLink({ path: 'signin', text: 'Войти' });
            return;
        }
        if (location.pathname === '/signin') {
            setLink({ path: 'signup', text: 'Регистрация' });
            return;
        }

        setLink({ path: 'signin', text: 'Выйти' });
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
