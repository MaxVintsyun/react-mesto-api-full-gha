import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header({ email, onSignOut }) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Лого" />
            <Routes>
                <Route exact path="/sign-in" element={
                    <Link to="/sign-up" className="header__link">
                        Регистрация
                    </Link>} />
                <Route exact path="/sign-up"
                    element={<Link to="/sign-in" className="header__link">Войти</Link>} />
                <Route exact path="/" element={
                    <div className="header__user-info">
                        <p className="header__email">{email}</p>
                        <Link to="/sign-in" className="header__link" onClick={onSignOut}>Выйти</Link>
                    </div>}>
                </Route>
            </Routes>
        </header>
    );
}

export default Header;