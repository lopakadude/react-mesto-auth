const BASE_URL = "http://api.express.lopakadude.nomoredomains.xyz";

function checkResponse(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`${res.status}`);
}

function request(endpoint, options) {
	return fetch(`${BASE_URL}/${endpoint}`, options).then(checkResponse)
}

export const registration = (inputValues) => {
	return request(`signup`, {
		method: "POST",
		credentials: "include",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: inputValues.email,
			password: inputValues.password,
		}),
	})
};

export const login = (inputValues) => {
	return request(`signin`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: inputValues.email,
			password: inputValues.password,
		}),
	})
		.then((data) => {
			if (data.token) {
				localStorage.setItem("jwt", data.token);
				return data;
			}
		})
};

export const checkToken = (jwt) => {
	return request(`users/me`, {
		method: "GET",
		credentials: "include",
		headers: {
			'Accept': 'application/json',
			"Content-Type": "application/json",
			//Authorization: `Bearer ${jwt}`,
		},
	})
};