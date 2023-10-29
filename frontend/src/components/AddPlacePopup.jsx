import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const name = useRef();
    const link = useRef();

    useEffect(() => {
        name.current.value = '';
        link.current.value = '';
    }, [isOpen]);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onAddPlace({
            name: name.current.value,
            link: link.current.value
        });
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitButtonText='Сохранить'>
            <label className="popup__field">
                <input className="popup__input" id="place-name-input" type="text" ref={name} name="name" placeholder="Название" minLength="2" maxLength="30" required />
                <span className="place-name-input-error popup__input-error"></span>
            </label>
            <label className="popup__field">
                <input className="popup__input" id="place-link-input" type="url" ref={link} name="link" placeholder="Ссылка на картинку" required />
                <span className="place-link-input-error popup__input-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;