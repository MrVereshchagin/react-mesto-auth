import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
    const { onRegister } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
    
        if (email && password) {
          onRegister(email, password);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
    
        if (name === "email") {
          setEmail(value);
        }
    
        if (name === "password") {
          setPassword(value);
        }
    }


    return (
        <form onSubmit={handleSubmit} className="popup__form popup__form_auth" name="register_profile" noValidate>
            <h2 className="popup__title popup__title_auth">Регистрация</h2>
            <input
                required
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                className="popup__input popup__input_auth"
                minLength="2"
                maxLength="40"
            />
            <span class="popup__error"></span>
            <input
                required
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                className="popup__input popup__input_auth"
                minLength="2"
                maxLength="40"
            />
            <span class="popup__error"></span>
            <button type="submit" className="popup__button popup__button_auth">Зарегистрироваться</button>

            <p className="popup__form-action">
                Уже зарегистрированы?{" "}
                <Link className="link" to="/sign-in">
                    Войти
                </Link>
            </p>
        </form>
    )
}

export default Register;