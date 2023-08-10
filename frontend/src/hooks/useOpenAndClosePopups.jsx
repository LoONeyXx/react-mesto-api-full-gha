import React from 'react';

export default function useOpenAndClosePopup(popups) {
    const [isOpenPopups, setIsOpen] = React.useState(popups);

    function openPopup(popup) {
        setIsOpen((prev) => ({ ...prev, [popup]: true }));
    }

    function closeAllPopups() {
        setIsOpen((prev) =>
            Object.keys(prev).reduce((acc, curr) => {
                acc[curr] = false;
                return acc;
            }, {})
        );
    }

    return [isOpenPopups, openPopup, closeAllPopups];
}
