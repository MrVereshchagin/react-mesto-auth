import React from 'react';

function InfoTooltip({ isOpen, onClose, isRequestCompleted }) {
    const statusIcon = isRequestCompleted
    ? "popup__status-icon_success"
    : "popup__status-icon_fail";
  const statusText = isRequestCompleted
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";
  const open = isOpen ? "popup_opened" : "";
  return (
    <>
      <div className={`popup popup__registration ${open}`}>
        <div className={`popup__container popup__container_registration`}>
          <button className="popup__close" onClick={onClose}></button>
          <div className={`popup__status-icon ${statusIcon}`}></div>
          <p className="popup__confirm">{statusText}</p>
        </div>
      </div>
    </>
  );
}

export default InfoTooltip;