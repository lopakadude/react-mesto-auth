class Api {
	constructor(settings) {
		this.baseUrl = settings.baseUrl;
		this.headers = settings.headers;
	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(`Ошибка: ${res.status}`);
	}

	_request(endpoint, options) {
		return fetch(`${this.baseUrl}/${endpoint}`, options)
			.then(this._checkResponse);
	};

	getUserInfo() {
		return this._request(`users/me`, {
			method: 'GET',
			headers: this.headers,
		})
	}

	setUserInfo(inputValues) {
		return this._request(`users/me`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				name: inputValues.name,
				about: inputValues.about
			})
		})
	}

	setChangeAvatar(inputValues) {
		return this._request(`users/me/avatar`, {
			method: 'PATCH',
			headers: this.headers,
			body: JSON.stringify({
				avatar: inputValues.avatar
			})
		})
	}

	getInitialCards() {
		return this._request(`cards`, {
			method: 'GET',
			headers: this.headers
		})
	}

	postNewCard(inputValues) {
		return this._request(`cards`, {
			method: 'POST',
			headers: this.headers,
			body: JSON.stringify({
				name: inputValues.name,
				link: inputValues.link
			})
		})
	}

	deleteCard(cardId) {
		return this._request(`cards/${cardId}`, {
			method: 'DELETE',
			headers: this.headers
		})
	}

	_likeCard(cardId) {
		return this._request(`cards/${cardId}/likes`, {
			method: 'PUT',
			headers: this.headers
		})
	}

	_unlikeCard(cardId) {
		return this._request(`cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: this.headers
		})
	}

	changeLikeCardStatus(cardId, isLiked) {
		if (!isLiked) {
			return this._likeCard(cardId)
		}
		else {
			return this._unlikeCard(cardId)
		}
	}
}

export const api = new Api({
	baseUrl: 'http://api.express.lopakadude.nomoredomains.xyz',
	headers: {
		'Content-Type': 'application/json'
	}
});
