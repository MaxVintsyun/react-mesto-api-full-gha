import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(id => id === currentUser._id);

    const handleClick = () => {
        onCardClick(card);
    }

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleCardDelete = () => {
        onCardDelete(card._id)
    }

    return (
        <article className="card">
            {isOwn && <button className="card__delete" onClick={handleCardDelete} type="button" />}
            <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
            <h3 className="card__name">{card.name}</h3>
            <div className="card__likes">
                <button
                    className={`card__like-button ${isLiked ? 'card__like-button_active' : ''}`}
                    onClick={handleLikeClick} type="button" />
                <p className="card__likes-count">{card.likes.length}</p>
            </div>
        </article>
    );
}

export default Card;