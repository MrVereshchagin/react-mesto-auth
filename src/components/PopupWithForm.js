import React from "react";

function PopupWithForm(props) {
    const popupVisible = props.isOpen ? "popup_opened" : "";

    return (
        <div className = {`popup popup_${props.name} ${popupVisible}`}>
            <div className = "popup__container">
                <button
                    className = "popup__close"
                    onClick = {props.onClose}
                    type = "button">
                </button>
                <h2 className = "popup__title">{props.title}</h2>
                <form
                    action = "#"
                    id = {`popup__form_${props.name}`}
                    className = "popup__form popup__form_profile"
                    method = "post"
                    name = "profilecard"
                    onSubmit = {props.onSubmit}
                >
                    {props.children}
                    <button
                        id = "popup_profile_save-button"
                        type = "submit"
                        className = "popup__button popup__button_edit_profile">
                            {props.button}
                        </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;