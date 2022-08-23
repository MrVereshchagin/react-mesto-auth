import React, { useState } from "react";

function Login (props) {
    const { onLogin } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChange (e) {
        const {name, value} = e.target;
        if(name === 'email') {
            setEmail(value);
        }

        if(name === 'password') {
            setPassword(value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(email && password) {
            onLogin(email, password);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="popup__form popup__form_auth" name="login_profile" noValidate>
            <h2 className="popup__title popup__title_auth">Вход</h2>
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
            <span className="popup__error"></span>
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
            <span className="popup__error"></span>
            <button type="submit" className="popup__button popup__button_auth">Войти</button>
        </form>
    )
}

export default Login;