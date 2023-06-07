import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';
import { useContext } from 'react';

function Card(props) {
	const currentUser = useContext(CurrentUserContext);
	const card = props.card;
	const isOwn = card.owner._id === currentUser._id;
	const isLiked = card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = (
		`elements__like ${isLiked && 'elements__like_active'}`
	);

	function handleClick() {
		props.onCardClick(props.card);
	}

	function handleLikeClick() {
		props.onCardLike(props.card)
	}

	function handleDeleteClick() {
		props.onCardDelete(props.card)
	}

	return (
		<article className="elements__element">
			<img className="elements__image"
				src={props.src}
				alt={props.title}
				onClick={handleClick} />
			{isOwn && <button className="elements__delete" onClick={handleDeleteClick} type="button" />}
			<div className="elements__row">
				<h2 className="elements__name">{props.title}</h2>
				<div className="elements__like-and-count">
					<button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
					<p className="elements__count-of-likes">{props.like.length}</p>
				</div>
			</div>
		</article>
	);
}

export default Card;

