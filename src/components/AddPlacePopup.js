import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    
    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen])

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddCard({
            name: name,
            link: link
        })
    }
    
    return (
        <PopupWithForm
            title = "Новое место"
            name = "cards"
            button = "Создать"
            isOpen = {props.isOpen}
            onClose = {props.onClose}
            onSubmit = {handleSubmit}
            onAddPlace = {props.onAddPlace}
            onUpdateCard = {props.onUpdateCard}
        >   
            <input
                id = "popup_cards_title"
                type = "text"
                className = "popup__input popup__input_card_title popup__input_error_visible"
                value = {name}
                placeholder = "Название"
                name = "cardtitle"
                minLength = "2"
                maxLength = "30"
                required
                onChange={handleChangeName}
            />
            <span id = "error-popup_cards_title" className = "popup__error"></span>
            <input  
                id = "popup_cards_link"
                type = "url"
                className = "popup__input popup__input_card_link popup__input_error_visible"
                value = {link} 
                placeholder = "Ссылка на картинку"
                name = "cardlink"
                required
                onChange={handleChangeLink}
                onClose = {props.onClose} 
            />
            <span id = "error-popup_cards_link" className = "popup__error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;