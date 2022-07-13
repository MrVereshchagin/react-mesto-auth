import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){

    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
          [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.password === this.state.confirmPassword){
          auth.register(this.state.username, this.state.password, this.state.email, this.state.calGoal).then((res) => {
            if(res.statusCode !== 400){
              this.props.history.push('/login');
            }
          });
        }
    }

    render() {
        return (
            <div className="register">
                <header className="header register__header">
                    <a href="#"><img src="./images/logo.svg" alt="лого" class="header__logo"/></a>
                    <a href='#'>Регистрация</a>
                </header>

                <h2 className="register__title">Вход</h2>

                <form onSubmit={this.handleSubmit} className="register__form">
                    <label htmlFor="username">
                        Email:
                    </label>
                    <input required id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
                    <label htmlFor="password">
                        Пароль:
                    </label>
                    <input required id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                    <div className="register__button-container">
                        <button type="submit" onSubmit={this.handleSubmit} className="register__link">Зарегистрироваться</button>
                    </div>
                </form>

                <div className="register__signup">
                    <p>Уже зарегистрированы?</p>
                    <Link to="/sign-in" className="register__signup_link">Войти</Link>
                </div>
            </div>
        )
    }
}

export default Register;