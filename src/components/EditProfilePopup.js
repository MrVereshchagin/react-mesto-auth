import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    const currentUser = React.useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);


    return (
        <PopupWithForm
            title = "Редактировать профиль"
            name = "profile"
            button = "Сохранить"
            isOpen = {props.isOpen}
            onClose = {props.onClose}
            onSubmit = {handleSubmit}
        >
            <input
                id = "popup_profile_name"
                type =   "text"
                className = "popup__input popup__input_profile_name popup__input_error_visible"
                name = "profilename"
                minLength = "2"
                maxLength = "40"
                required
                value = {name || ''}
                onChange = {handleChangeName}
            />
            <span id = "error-popup_profile_name" className = "popup__error"></span>
            <input
                id = "popup_profile_nickname"
                type = "text"
                className = "popup__input popup__input_profile_nickname popup__input_error_visible"
                name = "profilenickname"
                minLength = "2"
                maxLength = "200"
                required
                value = {description || ''}
                onChange = {handleChangeDescription}
            />
            <span id = "error-popup_profile_nickname" className = "popup__error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;