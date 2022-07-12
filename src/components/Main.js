import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = useContext(CurrentUserContext);
   
    return (
        <main>
            <section className = "profile">
                <div className = "profile__account">
                    <img
                        src = {currentUser.avatar}
                        style = {{ backgroundImage: `url(${currentUser.avatar})` }}
                        alt = "картинка профиля"
                        className = "profile__avatar" />
                    <button
                        type = "button"
                        className = "profile__edit-avatar"
                        onClick = {props.onEditAvatar}>
                    </button>
                    <div className = "profile__info">
                        <h1 className = "profile__name">{currentUser.name}</h1>
                        <button
                            className = "profile__edit-button"
                            title = "кнопка редактировать"
                            type = "button"
                            onClick = {props.onEditProfile}>
                        </button>
                        <p className = "profile__nickname">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    className = "profile__button"
                    title = "кнопка добавить"
                    type = "button"
                    onClick = {props.onAddPlace}>
                </button>
            </section>
  
            <section className = "elements">
                {
                    props.cards.map((card) => (
                       <Card 
                        key = {card._id}
                        card = {card}
                        onCardClick = {props.onCardClick}
                        onCardLike = {props.onCardLike}
                        onCardDelete = {props.onCardDelete}
                       />
                    ))
                }
            </section>
        </main>
    );
}

export default Main;