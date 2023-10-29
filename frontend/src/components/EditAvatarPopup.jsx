import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatar = useRef();

    useEffect(() => {
        avatar.current.value = '';
    }, [isOpen]);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: avatar.current.value
        });
    }

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitButtonText='Сохранить'>
            <label className="popup__field">
                <input className="popup__input" id="avatar-link-input" type="url" ref={avatar} name="avatar" placeholder="Ссылка на картинку" required />
                <span className="avatar-link-input-error popup__input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;