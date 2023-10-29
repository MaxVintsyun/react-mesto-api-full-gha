import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import { api } from '../utils/Api';
import { auth } from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import SuccessImg from "../images/SuccessImg.svg"
import UnsuccessImg from "../images/UnsuccessImg.svg"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getDefaultCards()])
        .then(([userData, defaultCards]) => {
          setCurrentUser(userData);
          setCards(defaultCards);
        })
        .catch((error) => { console.error('Ошибка: ', error) });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    checkToken();
  }, []);


  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          navigate('/', { replace: true });
        })
        .catch((error) => { console.error('Ошибка: ', error) });
    }
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((error) => { console.error('Ошибка: ', error) });
  }

  function handleUpdateUser(data) {
    api.updateUserInfo(data)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((error) => { console.error('Ошибка: ', error) });
  }

  function handleAddPlaceSubmit(cardData) {
    api.postCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => { console.error('Ошибка: ', error) });;
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => { console.error('Ошибка: ', error) });;
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => {
        setCards(cards => cards.filter((c) => c._id !== cardId));
      })
      .catch((error) => { console.error('Ошибка: ', error) });
  }

  function handleLogin(email, password) {
    auth.authUser(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate('/', { replace: true });
        }
      })
      .catch((error) => { console.error('Ошибка: ', error) });
  }

  function handleRegister(email, password) {
    auth.registerUser(email, password)
      .then((userData) => {
        setRegistrationSuccess(true)
        navigate('/sign-in', { replace: true })
      })
      .catch((error) => {
        setRegistrationSuccess(false);
        console.error('Ошибка: ', error);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      })
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in', { replace: true })
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={userEmail}
          onSignOut={handleSignOut}
        />
        <Routes>
          <Route path='/*'
            element={
              <ProtectedRoute
                element={Main}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path='/sign-in'
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path='/sign-up'
            element={<Register onRegister={handleRegister}
              isSuccess={isRegistrationSuccess} />}
          />
        </Routes>
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          link={selectedCard?.link}
          name={selectedCard?.name}
          onClose={closeAllPopups} />

        <PopupWithForm name="delete-card" title="Вы уверены?" onClose={closeAllPopups}>
          <button className="popup__save-button popup__delete-button" type="submit">Да</button>
        </PopupWithForm>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          icon={isRegistrationSuccess ? SuccessImg : UnsuccessImg}
          text={isRegistrationSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;