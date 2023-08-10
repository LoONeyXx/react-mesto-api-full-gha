import CurrentUserContext from '../contexts/CurrentUserContext';
import React from 'react';
const Card = React.memo(function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = currentUser._id === card.owner._id;
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    const cardLikeButtonClassName = `button cards__like-btn ${isLiked && 'cards__like-btn_active'} no-highlight`;

    function handleClickDelete() {
        onCardDelete(card);
    }
    function handleClick() {
        onCardClick(card);
    }
    function handleLikeClick() {
        onCardLike(card);
    }

    return (
        <li className='cards__item scale-animation'>
            {isOwn && (
                <button
                    onClick={handleClickDelete}
                    className='button cards__delete-btn opacity no-highlight'
                />
            )}
            <div
                onClick={handleClick}
                style={{
                    backgroundImage: `url(${card.link})`,
                }}
                className='cards__image'
            />
            <div className='cards__title-zone'>
                <h2 className='cards__title'>{card.name}</h2>
                <div className='cards__like-zone'>
                    <button
                        onClick={handleLikeClick}
                        type='button'
                        className={cardLikeButtonClassName}
                    />
                    <p className='cards__like-counter'>{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
});

export default Card;
