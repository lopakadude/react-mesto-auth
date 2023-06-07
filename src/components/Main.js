import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Main(props) {
	const currentUser = useContext(CurrentUserContext)

	return (
		<main className="content">
			<section className="profile">
				<img
					src={currentUser.avatar}
					className="profile__avatar" alt="фото профиля" />
				<div className="profile__avatar-cover" onClick={props.onEditAvatar}></div>
				<div className="profile__info">
					<div className="profile__user">
						<h1 className="profile__name">{currentUser.name}</h1>
						<button type="button" className="profile__edit-btn" onClick={props.onEditProfile}></button>
					</div>
					<p className="profile__description">{currentUser.about}</p>
				</div>
				<button type="button" className="profile__add-btn" onClick={props.onAddPlace}></button>
			</section>
			<section className="elements">
				{props.cards.map((card) => (
					<Card
						onCardLike={props.onCardLike}
						onCardClick={props.onCardClick}
						onCardDelete={props.onCardDelete}
						card={card}
						key={card._id}
						src={card.link}
						title={card.name}
						like={card.likes}
					/>
				))}
			</section>
		</main>
	)


}

export default Main