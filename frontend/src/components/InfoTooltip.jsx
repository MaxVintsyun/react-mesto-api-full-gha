import React from "react";

function InfoTooltip({isOpen, icon, text, onClose}) {
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__overlay popup__content">
                <img className="popup-info-tooltip__image" src={icon} alt='' />
                <p className="popup-info-tooltip__text">
                    {text}
                </p>
                <button className="popup__close-button" type="button" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default InfoTooltip;