import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const handleNameChange = (evt) => {
        setName(evt.target.value)
    }

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitButtonText='Сохранить'>
            <label className="popup__field">
                <input className="popup__input" id="profile-name-input" type="text" value={name || ''} onChange={handleNameChange} name="name" placeholder="Имя" minLength="2" maxLength="40" required />
                <span className="profile-name-input-error popup__input-error"></span>
            </label>
            <label className="popup__field">
                <input className="popup__input" id="profile-about-input" type="text" value={description || ''} onChange={handleDescriptionChange} name="about" placeholder="О себе" minLength="2" maxLength="200" required />
                <span className="profile-about-input-error popup__input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;