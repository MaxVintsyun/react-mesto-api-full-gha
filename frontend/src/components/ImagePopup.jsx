import React from 'react';

function ImagePopup({ link, name, onClose }) {
    return (
        <div className={`popup image-popup ${link ? 'popup_opened' : ''}`} id="image-popup">
        <div className="image-popup__container popup__content">
          <figure className="image-popup__figure">
            <img className="image-popup__image" src={link} alt={name} />
            <figcaption className="image-popup__caption">{name}</figcaption>
          </figure>
          <button className="popup__close-button" type="button" onClick={onClose}></button>
        </div>
      </div>
    ); 
}

export default ImagePopup;