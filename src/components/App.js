import React from 'react'
import { useEffect, useState } from 'react';
import Header from './Header';
import '../index.css';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/API';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { IsLoading } from '../contexts/IsLoading';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';
import * as auth from '../utils/Auth';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState({});
	const [currentUser, setCurrentUser] = useState({});
	const [cards, setCards] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();
	const [isSuccess, setIsSuccess] = useState(false);
	const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
	const [email, setEmail] = useState('');



	useEffect(() => {
		api
			.getUserInfo()
			.then((data) => {
				setCurrentUser(data);
			})
			.catch((err) => console.log(`Ошибка: ${err}`))
	}, []);

	useEffect(() => {
		api
			.getInitialCards()
			.then((data) => {
				const cards = data.map((card) => {
					return {
						link: card.link,
						name: card.name,
						likes: card.likes,
						_id: card._id,
						owner: card.owner
					};
				});
				setCards(cards);
			})
			.catch((err) => console.log(`Ошибка: ${err}`))
	}, [])

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
	}
	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
	}
	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
	}
	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);
		api.changeLikeCardStatus(card._id, isLiked)
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
			})
			.catch((err) => console.log(`Ошибка: ${err}`));
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id)
			.then(res => {
				setCards((state) => state.filter((c) => c._id !== card._id));
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
	}

	function handleUpdateUser({ name, about }) {
		setIsLoading(!isLoading);
		api.setUserInfo({ name: name, about: about })
			.then((res) => {
				setCurrentUser(res)
				closeAllPopups()
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
			.finally(() => setIsLoading(false));
	}

	function handleUpdateAvatar(avatar) {
		setIsLoading(!isLoading);
		api.setChangeAvatar(avatar)
			.then((res) => {
				setCurrentUser(res)
				closeAllPopups()
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
			.finally(() => setIsLoading(false));
	}

	function handleAddPlaceSubmit({ name, link }) {
		setIsLoading(!isLoading);
		api.postNewCard({ name, link })
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups()
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
			.finally(() => setIsLoading(false));
	}

	function closeAllPopups() {
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setSelectedCard({});
		setInfoToolTipPopupOpen(false);
	}

	useEffect(() => {
		const jwt = localStorage.getItem('jwt');

		if (jwt) {
			auth
				.checkToken(jwt)
				.then((res) => {
					setIsLoggedIn(true);
					setEmail(res.data.email);
					navigate('/', { replace: true });
				})
				.catch((err) => {
					console.log(`Ошибка: ${err}`);
				})
		}
	}, [navigate]);

	function handleRegistrationSubmit(email, password) {
		auth
			.registration(email, password)
			.then((res) => {
				setInfoToolTipPopupOpen(true);
				setIsSuccess(true);
				navigate('/sign-in', { replace: true });
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
				setInfoToolTipPopupOpen(true);
				setIsSuccess(false);
			});
	}

	function handleLoginSubmit(email, password) {
		auth
			.login(email, password)
			.then((res) => {
				setIsLoggedIn(true);
				setEmail(email);
				navigate('/', { replace: true });
			})
			.catch((err) => {
				console.log(`Ошибка: ${err}`);
			})
	}


	return (
		<IsLoading.Provider value={isLoading}>
			<CurrentUserContext.Provider value={currentUser}>
				<main
					className="page"
				>
					<Header
						email={email}
						isLoggedIn={isLoggedIn} />
					<Routes>
						<ProtectedRoute
							exact
							path="/"
							isLoggedIn={isLoggedIn}
							onEditAvatar={handleEditAvatarClick}
							onEditProfile={handleEditProfileClick}
							onAddPlace={handleAddPlaceClick}
							onCardClick={handleCardClick}
							onCardLike={handleCardLike}
							onCardDelete={handleCardDelete}
							cards={cards}
							component={Main}
						/>
						<Route path="/sign-in">
							<Login onLogin={handleLoginSubmit} />
						</Route>
						<Route path="/sign-up">
							<Register onRegister={handleRegistrationSubmit} />
						</Route>
						<Route>
							{isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
						</Route>
					</Routes>
					{isLoggedIn && <Footer />}
					<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onClose={closeAllPopups}
						onUpdateUser={handleUpdateUser}
					/>
					<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onClose={closeAllPopups}
						onAddPlace={handleAddPlaceSubmit}>
					</AddPlacePopup>
					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onClose={closeAllPopups}
						onUpdateAvatar={handleUpdateAvatar} />
					<PopupWithForm
						name="delete"
						title="Вы уверены?"
						onClose={closeAllPopups}
						submit="Да">
					</PopupWithForm>
					<ImagePopup
						name="bigImg"
						card={selectedCard}
						onClose={closeAllPopups}
					/>
					<InfoToolTip
						isOpen={isInfoToolTipPopupOpen}
						onClose={closeAllPopups}
						isSuccess={isSuccess}
					/>
				</main>
			</CurrentUserContext.Provider>
		</IsLoading.Provider>
	);
}

export default App;