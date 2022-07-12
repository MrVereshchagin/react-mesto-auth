import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef('');

    useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      }

    return (
        <PopupWithForm
            title = "Обновить аватар"
            name = "avatar"
            button = "Да"
            isOpen = {props.isOpen}
            onClose = {props.onClose}
            onSubmit = {handleSubmit}
        >
            <input
                id = "popup_avatar_link"
                type = "url"
                className = "popup__input popup__input_error_visible"
                placeholder = "Ссылка на аватар"
                name = "avatarlink"
                required
                ref = {avatarRef}
            />
            <span id = "error-popup_avatar_link" className = "popup__error"></span>
        </PopupWithForm>    
    );
}

export default EditAvatarPopup;