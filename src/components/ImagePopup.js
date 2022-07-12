import React from "react";

function ImagePopup(props) {
  const popupVisible = props.card ? "popup_opened" : "";

  return (
    <div className = {`popup popup_${props.name} ${popupVisible}`}>
      <div className = "popup__container popup__container_image_element">
        <button
          className = "popup__close popup__close_image"
          onClick = {props.onClose}
          type = "button">
        </button>
        <div className = "popup__image popup__image_group">
          <img
            className = "popup__image popup__image_item"
            src = {props.card && props.card.link}
            alt = {props.card && props.card.link}
          />
          <p className = "popup__image popup__image_caption">{props.card && props.card.name}</p>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;