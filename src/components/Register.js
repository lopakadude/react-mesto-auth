import { useState } from "react";
import { Link } from 'react-router-dom'

export default function Register(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleEmailChange(evt) {
		setEmail(evt.target.value);
	}

	function handlePasswordChange(evt) {
		setPassword(evt.target.value);
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		props.onRegister(email, password);
	}

	return (
		<section className="auth">
			<h2 className="auth__title">Регистрация</h2>
			<form className="auth__form" onSubmit={handleSubmit}>
				<input
					className="auth__form-input"
					placeholder="Email"
					name="email"
					type="email"
					required
					value={email || ""}
					onChange={handleEmailChange}
					autoComplete="off"
				/>
				<input
					className="auth__form-input"
					placeholder="Пароль"
					name="password"
					type="password"
					required
					value={password || ""}
					onChange={handlePasswordChange}
					autoComplete="off"
				/>
				<button
					className="auth__form-submit-btn auth__form-submit-btn_size"
					type="submit">
					Зарегистрироваться
				</button>
				<div className="auth__signup">
					<p className="auth__signup_text">Уже зарегистрированы?</p>
					<Link
						to="sign-in"
						className="auth__signup_link">
						Войти
					</Link>
				</div>
			</form>
		</section>
	);
}