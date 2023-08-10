import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
const Profile = React.memo(function Profile({ onEditAvatar, onEditProfile, onAddPlace }) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <section className='profile'>
            <div
                onClick={onEditAvatar}
                className='profile__overlay no-highlight'
            >
                <div
                    style={{
                        backgroundImage: `url(${currentUser.avatar})`,
                    }}
                    className='profile__image'
                />
            </div>
            <div className='profile__info'>
                <h1 className='profile__title'>{currentUser.name}</h1>
                <button
                    onClick={onEditProfile}
                    type='button'
                    className='button profile__btn-edit opacity no-highlight'
                />
                <p className='profile__subtitle'>{currentUser.about}</p>
            </div>
            <button
                onClick={onAddPlace}
                type='button'
                className='button profile__btn-add opacity no-highlight'
            />
        </section>
    );
});
export default Profile;
