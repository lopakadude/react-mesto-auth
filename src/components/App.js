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
import { AppContext } from '../contexts/AppContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute'
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
		if (isLoggedIn) {
			Promise.all([api.getUserInfo(), api.getInitialCards()])
				.then(([user, cards]) => {
					setCurrentUser(user.data);
					setCards(cards.data);
				})
				.catch(console.error)
		}
	}, [isLoggedIn])

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
			.catch(console.error)
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id)
			.then(res => {
				setCards((state) => state.filter((c) => c._id !== card._id));
			})
			.catch(console.error)
	}


	function handleSubmit(request) {
		setIsLoading(true);
		request()
			.then(closeAllPopups)
			.catch(console.error)
			.finally(() => setIsLoading(false));
	}


	function handleUpdateUser({ name, about }) {
		function makeRequest() {
			return api.setUserInfo({ name: name, about: about }).then(setCurrentUser);
		}
		handleSubmit(makeRequest);
	}

	function handleUpdateAvatar(avatar) {
		function makeRequest() {
			return api.setChangeAvatar(avatar).then(setCurrentUser);
		}
		handleSubmit(makeRequest);
	}

	function handleAddPlaceSubmit({ name, link }) {
		function makeRequest() {
			return api.postNewCard({ name, link }).then((newCard) => {
				setCards([newCard, ...cards])
			})
		}
		handleSubmit(makeRequest);
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
				.catch(console.error)
		}
	}, [navigate]);

	function handleRegistrationSubmit({ email, password }) {
		auth
			.registration({ email, password })
			.then((res) => {
				setIsSuccess(true);
				navigate('/sign-in', { replace: true });
			})
			.catch(() => {
				console.error();
				setIsSuccess(false);
			})
			.finally(() => {
				setInfoToolTipPopupOpen(true)
			})
	}

	function handleLoginSubmit({ email, password }) {
		auth
			.login({ email, password })
			.then(() => {
				setIsLoggedIn(true);
				setEmail(email);
				navigate('/', { replace: true });
			})
			.catch(console.error)
	}

	function handleSignOut() {
		localStorage.removeItem('jwt');
		setIsLoggedIn(false);
		navigate('/sign-in', { replace: true });
	}


	return (
		<AppContext.Provider value={{ isLoading, closeAllPopups }}>
			<CurrentUserContext.Provider value={currentUser}>
				<div
					className="page"
				>
					<Header
						email={email}
						isLoggedIn={isLoggedIn}
						onSignOut={handleSignOut} />
					<Routes>
						<Route
							path="/"
							element={(
								<ProtectedRoute
									isLoggedIn={isLoggedIn}>
									<>
										<Main
											onEditProfile={handleEditProfileClick}
											onAddPlace={handleAddPlaceClick}
											onEditAvatar={handleEditAvatarClick}
											onCardClick={handleCardClick}
											onCardLike={handleCardLike}
											onCardDelete={handleCardDelete}
											cards={cards}
										/>
										<Footer />
									</>
								</ProtectedRoute>
							)}
						/>
						<Route path="/sign-in"
							element={<Login onLogin={handleLoginSubmit} />} />
						<Route path="/sign-up" element={<Register
							onRegister={handleRegistrationSubmit} />} />
					</Routes>
					<EditProfilePopup
						isOpen={isEditProfilePopupOpen}
						onUpdateUser={handleUpdateUser}
					/>
					<AddPlacePopup
						isOpen={isAddPlacePopupOpen}
						onAddPlace={handleAddPlaceSubmit}>
					</AddPlacePopup>
					<EditAvatarPopup
						isOpen={isEditAvatarPopupOpen}
						onUpdateAvatar={handleUpdateAvatar} />
					<PopupWithForm
						name="delete"
						title="Вы уверены?"
						submit="Да">
					</PopupWithForm>
					<ImagePopup
						name="bigImg"
						card={selectedCard}
					/>
					<InfoToolTip
						name="tooltip"
						isOpen={isInfoToolTipPopupOpen}
						isSuccess={isSuccess}
					/>
				</div>
			</CurrentUserContext.Provider>
		</AppContext.Provider>
	);
}

export default App;