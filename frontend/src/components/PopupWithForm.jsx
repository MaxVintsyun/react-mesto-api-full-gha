import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} id={`popup__${props.name}`}>
            <div className="popup__overlay popup__content">
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__container" id={`popup__container_${props.name}`} name={`popup-form-${props.name}`} method="post" onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__save-button" type="submit">{props.submitButtonText}</button>
                </form>
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    );
}

export default PopupWithForm;