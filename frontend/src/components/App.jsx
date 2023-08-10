import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import Api from '../utils/API';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import Profile from './Profile';
import DeleteCardPopup from './DeleteCardPopup';
import successLogo from '../images/success.svg';
import errorLogo from '../images/error.svg';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from './ProtectedRoute';
import auth from '../utils/Auth';
import useOpenAndClosePopup from '../hooks/useOpenAndClosePopups';

function App() {
    const popups = React.useMemo(
        () => ({
            addCard: false,
            editProfile: false,
            editAvatar: false,
            imageCard: false,
            toolTip: false,
            deleteCard: false,
        }),
        []
    );

    const [loggedIn, setLogin] = React.useState(true);
    const [selectedCard, setSelectCard] = React.useState({
        name: '',
        link: '',
    });
    const [isOpenPopups, openPopup, closeAllPopups] = useOpenAndClosePopup(popups);
    const [cardToBeDeleted, setToBeDeletedCard] = React.useState('');
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});
    const [isLoading, setLoading] = React.useState(false);
    const [toolTip, setToolTip] = React.useState({});
    const navigate = useNavigate();

    function handleLogout() {
        setLogin(false);
        localStorage.removeItem('token');
        setCurrentUser({});
    }
    async function startRender() {
        try {
            const newCards = await Api.getCardsInfo();
            const newInfo = await Api.getProfileInfo();
            setCurrentUser((prev) => ({ ...prev, ...newInfo }));
            setCards(newCards);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        function consl() {
            console.log('storage changed');
        }
        window.addEventListener('storage', consl);
        return () => {
            window.removeEventListener('storage', consl);
        };
    }, [loggedIn]);
    useEffect(() => {
        if (loggedIn) {
            startRender();
        }
    }, [loggedIn]);

    const validationUser = React.useCallback(
        async (token) => {
            try {
                const responce = await auth.validation(token);
                const email = responce.data.email;
                setCurrentUser((prev) => ({ ...prev, email: email }));
                setLogin(true);
                navigate('/', { replace: true });
            } catch (error) {
                console.error(error);
            }
        },
        [navigate]
    );

    useEffect(() => {
        localStorage.token ? validationUser(localStorage.token) : setLogin(false);
    }, [validationUser]);

    async function handleSubmit(request, successMessage) {
        setLoading(true);
        try {
            await request();
            closeAllPopups();
            successMessage && setToolTip({ name: successMessage, link: successLogo });
        } catch (error) {
            console.error(error);
            setToolTip({ name: 'Что-то пошло не так! Попробуйте ещё раз.', link: errorLogo });
        } finally {
            setLoading(false);
            successMessage && openPopup('toolTip');
        }
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((user) => user._id === currentUser._id);
        function makeRequest() {
            return Api.changeLikeCardStatus(card._id, isLiked).then((newCard) =>
                setCards((prev) => prev.map((prevCard) => (prevCard._id === card._id ? newCard : prevCard)))
            );
        }

        handleSubmit(makeRequest);
    }

    function handleUpdateAvatar(info) {
        function makeRequest() {
            return Api.setProfileAvatar(info).then((newUserInfo) => {
                setCurrentUser((prev) => ({ ...prev, ...newUserInfo }));
            });
        }
        handleSubmit(makeRequest, 'Аватарка успешно обновлена.');
    }

    function handleAddCard(card) {
        function makeRequest() {
            return Api.addNewCard(card).then((newCard) => {
                setCards((prev) => [newCard, ...prev]);
            });
        }
        handleSubmit(makeRequest, 'Карточка успешно добавлена.');
    }

    function handleUpdateUser(info) {
        function makeRequest() {
            return Api.setProfileInfo(info).then((newUserInfo) =>
                setCurrentUser((prev) => ({ ...prev, ...newUserInfo }))
            );
        }
        handleSubmit(makeRequest, 'Данный пользователя успешно обновлены.');
    }

    function handleDeleteCard() {
        function makeRequest() {
            return Api.deleteCard(cardToBeDeleted).then(() => {
                setCards((prevCards) => prevCards.filter((card) => card._id !== cardToBeDeleted));
            });
        }
        handleSubmit(makeRequest, 'Карточка успешно удалена.');
    }

    function handleRegistartion(info) {
        function makeRequest() {
            return auth.registration(info).then(() => {
                navigate('/sign-in', { replace: true });
            });
        }
        handleSubmit(makeRequest, 'Вы успешно зарегистрировались!');
    }

    function handleAuthorization(info) {
        function makeRequest() {
            return auth.authorization(info).then(({ token }) => {
                validationUser(token);
                localStorage.setItem('token', token);
            });
        }
        handleSubmit(makeRequest, 'Вы успешно авторизоризовались');
    }

    function handleEditAvatarClick() {
        openPopup('editAvatar');
    }

    function handleEditProfileClick() {
        openPopup('editProfile');
    }

    function handleAddPlaceClick() {
        openPopup('addCard');
    }

    function handleCardClick(card) {
        setSelectCard(card);
        openPopup('imageCard');
    }
    function handleDeleteClick(card) {
        setToBeDeletedCard(card._id);
        openPopup('deleteCard');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header onExit={handleLogout} />

            <Routes>
                <Route
                    path='/*'
                    element={
                        <ProtectedRouteElement
                            loggedIn={loggedIn}
                            element={
                                <Main
                                    closeAllPopups={closeAllPopups}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleDeleteClick}
                                    cards={cards}
                                >
                                    <Profile
                                        onEditAvatar={handleEditAvatarClick}
                                        onEditProfile={handleEditProfileClick}
                                        onAddPlace={handleAddPlaceClick}
                                    />
                                </Main>
                            }
                        />
                    }
                ></Route>

                {!loggedIn && (
                    <Route
                        path='sign-up'
                        element={<Register onSubmit={handleRegistartion} />}
                    />
                )}
                {!loggedIn && (
                    <Route
                        path='sign-in'
                        element={<Login onSubmit={handleAuthorization} />}
                    />
                )}
            </Routes>

            <InfoTooltip
                name={toolTip.name}
                onClose={closeAllPopups}
                logo={toolTip.link}
                isOpen={isOpenPopups.toolTip}
            />

            <EditProfilePopup
                onUpdateUser={handleUpdateUser}
                onClose={closeAllPopups}
                isOpen={isOpenPopups.editProfile}
                isLoading={isLoading}
            />
            <EditAvatarPopup
                onUpdateAvatar={handleUpdateAvatar}
                isOpen={isOpenPopups.editAvatar}
                onClose={closeAllPopups}
                isLoading={isLoading}
            />
            <AddCardPopup
                isLoading={isLoading}
                onClose={closeAllPopups}
                isOpen={isOpenPopups.addCard}
                onAddCard={handleAddCard}
            />
            <DeleteCardPopup
                onDeleteCard={handleDeleteCard}
                isOpen={isOpenPopups.deleteCard}
                onClose={closeAllPopups}
                isLoading={isLoading}
            />
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
                name='card'
                isOpen={isOpenPopups.imageCard}
            />
            {loggedIn && <Footer />}
        </CurrentUserContext.Provider>
    );
}

export default App;
