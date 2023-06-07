class Api {
	constructor(settings) {
		this.baseUrl = settings.baseUrl;
		this.headers = settings.headers;
	}

	_response(res) {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getUserInfo() {
		return fetch(`${this.baseUrl}/users/me`, {
			method: 'GET',
			headers: this.headers,
		})
			.then((res) =>
				this._response(res)
			)
	}

	setUserInfo(inputValues) {
		return fetch(`${this.baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				name: inputValues.name,
				about: inputValues.about
			})
		})
			.then(res => 
				this._response(res)
			)

	}

	setChangeAvatar(inputValues) {
		return fetch(`${this.baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				avatar: inputValues.avatar
			})
		})
			.then(res => 
				this._response(res)
			)

	}

	getInitialCards() {
		return fetch(`${this.baseUrl}/cards`, {
			method: 'GET',
			headers: this.headers
		})
			.then(res => 
				this._response(res)
			)
	}

	postNewCard(inputValues) {
		return fetch(`${this.baseUrl}/cards`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				name: inputValues.name,
				link: inputValues.link
			})
		})
			.then(res => 
				this._response(res)
			)
	}

	deleteCard(cardId) {
		return fetch(`${this.baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this.headers
		})
			.then(res => 
				this._response(res)
			)
	}

	_likeCard(cardId) {
		return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: this.headers
		})
			.then(res => 
				this._response(res)
			)
	}

	_unlikeCard(cardId) {
		return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: this.headers
		})
			.then(res => 
				this._response(res)
			)
	}

	changeLikeCardStatus(cardId, isLiked) {
		if (!isLiked) {
			return this._likeCard(cardId)
		}
		else {
			return this._unlikeCard(cardId)
	}}
}


export const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
	headers: {
		authorization: '1ce6b059-9750-4713-9aa7-ca765112d918',
		'Content-Type': 'application/json'
	}
});
