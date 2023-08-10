import logo from '../images/logo.svg';
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { AuthLink } from './AuthLink';

const Header = React.memo(function Header({ onExit }) {
    const user = React.useContext(CurrentUserContext);
    const [isActiveMenu, setActiveMenu] = React.useState(false);

    return (
        <header className='header'>
            <div className={`header__burger-menu ${isActiveMenu && 'header__burger-menu_active'}`}>
                <p className='header__email'>{user.email ? user.email : ''}</p>
                <AuthLink onExit={onExit} />
            </div>
            <div className='header__container'>
                <img
                    alt='Логотип MESTO RUSSIA'
                    src={logo}
                    className='logo'
                />
                <div className='header__login-info'>
                    <p className='header__email'>{user.email ? user.email : ''}</p>
                    <AuthLink onExit={onExit} />
                </div>
                <div
                    onClick={() => setActiveMenu((prev) => !prev)}
                    className={`opacity header__burger ${isActiveMenu && 'header__burger_active'}`}
                >
                    {!isActiveMenu && <span></span>}
                </div>
            </div>
        </header>
    );
});

export default Header;
