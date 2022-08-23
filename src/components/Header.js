import React from 'react';
import { useContext } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import logo from '../images/logo.svg';

function Header(props) {
    const { onSignOut } = props;
    const { loggedIn, userEmail } = useContext(AuthContext);

    const headerLink = (
        <Switch>
            <Route exact path='/sign-in'>
                <Link to='/sign-up' className='link header__link'>Регистрация</Link>
            </Route>
            <Route exact path='/sign-up'>
                <Link to='/sign-in' className='link header__link'>Войти</Link>
            </Route>
        </Switch>
    );

    return (
        <header className="header">
            <img src = {logo} alt = "лого" className = "header__logo"/>
            <div className='header__menu'>
                { loggedIn && <p className='header__email'>{userEmail}</p> }
                { !loggedIn && headerLink }
                { loggedIn && <Link to='/#' onClick={onSignOut} className='link header__exit'>Выйти
                </Link> }
            </div>
        </header>
    );
}

export default Header;