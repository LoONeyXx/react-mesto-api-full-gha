import React from 'react';
import Card from './Card';
const Main = React.memo(function Main({ onCardClick, onCardLike, onCardDelete, cards, children }) {
    return (
        <main className='content'>
            {children}
            <section className='cards'>
                <ul className='list cards__container'>
                    {cards.map((card) => (
                        <Card
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                            key={card._id}
                            card={card}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
});

export default Main;
