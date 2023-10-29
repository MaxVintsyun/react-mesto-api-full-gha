import React from 'react';
import { useRef } from 'react';

function Login({ onLogin }) {
    const email = useRef();
    const password = useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onLogin(email.current.value, password.current.value);
    }


    return (
        <div className="sign">
            <h2 className="sign__title">Вход</h2>
            <form className="sign__form" id="login-form-container" name="login-form" onSubmit={handleSubmit}>
                <label className="sign__field" htmlFor="email">
                    <input className="sign__input" id="login-email-input" ref={email} name="email" type="email" placeholder="Email" required />
                </label>
                <label className="sign__field" htmlFor="password">
                    <input className="sign__input" id="login-password-input" ref={password} name="password" type="password" placeholder="Пароль" required />
                </label>
                <button type="submit" className="sign__submit">Войти</button>
            </form>
        </div>
    );
}

export default Login;