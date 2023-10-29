import { useRef } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister}) {
    const email = useRef();
    const password = useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onRegister(email.current.value, password.current.value);
    }

    return (
        <div className="sign">
            <h2 className="sign__title">Регистрация</h2>
            <form className="sign__form" id="register-form-container" name="register-form" onSubmit={handleSubmit}>
                <label className="sign__field" htmlFor="email">
                    <input className="sign__input" id="register-email-input" ref={email} name="email" type="email" placeholder="Email" required />
                </label>
                <label className="sign__field" htmlFor="password">
                    <input className="sign__input" id="register-password-input" ref={password} name="password" type="password" placeholder="Пароль" required />
                </label>
                <button type="submit" className="sign__submit">Зарегистрироваться</button>
            </form>
            <Link to="/sign-in" className="sign__redirect">Уже зарегистрированы? Войти</Link>
        </div>
    );
}

export default Register;