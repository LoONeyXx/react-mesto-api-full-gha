import React from 'react';

function Popup({ name, isOpen, onClose, children }) {
    React.useEffect(() => {
        if (!isOpen) return;

        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', closeByEscape);

        return () => document.removeEventListener('keydown', closeByEscape);
    }, [isOpen, onClose]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    return (
        <section
            onClick={handleOverlayClick}
            className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}
        >
            <div className={`popup__container popup__container_type_${name}`}>
                <button
                    onClick={onClose}
                    type='button'
                    className='button popup__btn-close opacity no-highlight'
                />
                {children}
            </div>
        </section>
    );
}
export default Popup;
