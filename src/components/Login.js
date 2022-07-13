import React from "react";
import { Link, withRouter } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if(!this.state.username || !this.state.password) {
            return;
        }
        auth.authorize(this.state.username, this.state.password)
        .then((data) => {
            if(data.jwt) {
                this.setState({email:'', password: ''})
            }
        })
    }

    render(){
        return(
            <div className="login">
                <header className="header login__header">
                    <a href="#"><img src="./images/logo.svg" alt="лого" class="header__logo"/></a>
                    <a href='#'>Войти</a>
                </header>

                <h2 className="login__title">Вход</h2>

                <form onSubmit={this.handleSubmit} className="login__form">
                    <label htmlFor="username">
                        Email:
                    </label>
                    <input required id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
                    <label htmlFor="password">
                        Пароль:
                    </label>
                    <input required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                    <div className="login__button-container">
                        <button type="submit" onSubmit={this.handleSubmit} className="login__link">Войти</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;