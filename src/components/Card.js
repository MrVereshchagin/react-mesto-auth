import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({onCardClick, onCardLike, onCardDelete, card}) {
    const currentUser = React.useContext(CurrentUserContext);
    function handleClick() {
        onCardClick(card);
    }
    
    const isOwn = card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
    );

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_active' : 'element__like_non_active'}`
    );

    function handleLikeClick() {
        onCardLike(card);
    }
    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <div className = "element">
            <img
                src = {card.link}
                alt = {card.name}
                className = "element__photo"
                onClick = {handleClick}
            />
            <button
                className = {cardDeleteButtonClassName}
                type = "button"
                aria-label = "кнопка удалить"
                onClick = {handleDeleteClick}
            >
            </button>
            <div className = "element__information">
                <h2 className = "element__title">{card.name}</h2>
                <div className = "element__container">
                    <button
                        type = "button"
                        className = {cardLikeButtonClassName}
                        aria-label = "кнопка лайк"
                        onClick = {handleLikeClick}
                    >
                    </button>
                    <span className = "element__like-count">{card.likes.length}</span>
                </div>
            </div>
        </div>
    ) 
}

export default Card;