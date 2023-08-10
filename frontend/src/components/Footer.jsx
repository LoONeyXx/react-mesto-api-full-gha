import React from 'react';

const Footer = React.memo(function Footer() {
    return (
        <footer className='footer'>
            <p className='footer__copytight'>© {new Date().getFullYear()} Mesto Russia</p>
        </footer>
    );
});

export default Footer;
