import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';

import ProtectedRoute from './ProtectedRoute';
import Auth from '../utils/Auth';
import Login from './Login';
import Register from './Register';
import PageNotFound from './PageNotFound';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AuthContext } from "../contexts/AuthContext";

function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);
  const [isRequestCompleted, setRequestCompleted] = useState(false);
  const [isTooltipPopupOpen, setTooltipPopupOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.checkToken(jwt)
        .then((data) => {
          if (data.email) {
            setUserEmail(data.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch(console.error);
    }
  }

  function handleSignOutClick() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([data, cards]) => {
          setCards(cards);
          setCurrentUser(data);
        })
        .catch(console.error);
    }
  }, [loggedIn]);


  useEffect(() => {
    api.getProfile()
    .then ((userData) => {
      setCurrentUser(userData);
    })
    .catch((err) => {
        console.log(err);
    })
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setTooltipPopupOpen(false);
  }

  const handleUpdateUser = (data) => {
    api.editProfile(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar ({avatar}) {
    api.updateAvatar(avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  useEffect((cards) => {
      api.getInitialCards(cards)
      .then((cardsItems) => {
          setCards(cardsItems);
      })
      .catch((err) => {
          console.log(err);
      })
  }, []);
  
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
        console.log(err);
    });
  }

  function handleCardDelete(card) {
    // const isOwn = card.owner._id === currentUser._id;

    api.deleteCard(card._id).then((res) => {
        setCards((prevState) => prevState.filter((c) => c._id !== card._id && c));
    }).catch((err) => {
        console.log(err);
    })
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addCard(name, link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleLoginSubmit(email, password) {
    Auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          console.log(res.token);
          setLoggedIn(true);
          setUserEmail(email);
          history.push("/");
        }
      })
      .catch((res) => {
        console.log(res);
        setRequestCompleted(false);
        setTooltipPopupOpen(true);
      });
  }

  function handleRegisterSubmit(email, password) {
    Auth.register(email, password)
      .then((res) => {
        if (res.data) {
          setLoggedIn(true);
          setRequestCompleted(true);
          setTooltipPopupOpen(true);

          setTimeout(() => {
            history.push("/sign-in");
            setTooltipPopupOpen(false);
          }, 1500);
        }
      })
      .catch(() => {
        setRequestCompleted(false);
        setTooltipPopupOpen(true);
      });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>  
      <AuthContext.Provider value={{ loggedIn: loggedIn, userEmail: userEmail }}>
        <div className="body">
          <Header onSignOut={handleSignOutClick}/>
          <Switch>  
            <ProtectedRoute 
              exact path = '/'
              loggedIn = {loggedIn} 
              component = {Main}
              onEditProfile = {handleEditProfileClick}
              onAddPlace = {handleAddPlaceClick}
              onEditAvatar = {handleEditAvatarClick}
              onCardClick = {handleCardClick}
              cards = {cards}
              onCardLike = {handleCardLike}
              onCardDelete = {handleCardDelete}
            />
            <Route exact path='/sign-up'>
              <Register onRegister={handleRegisterSubmit} />
            </Route>
            
            <Route path='/sign-in'>
              <Login onLogin={handleLoginSubmit} />
            </Route>
            
            <Route>
              <Redirect to = {`${loggedIn ? "/" : "/sign-in"}`}/>
            </Route>

            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit} />

          <PopupWithForm
            title = "Вы уверены?"
            name = "delete-confirm"
            button = "Да"
          />

          <ImagePopup
            name = "image"
            card = {selectedCard}
            onClose = {closeAllPopups}
          />

          <InfoTooltip
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
            isRequestCompleted={isRequestCompleted}
          />

        </div>
      </AuthContext.Provider>
    </CurrentUserContext.Provider>

  );
}

export default App;
