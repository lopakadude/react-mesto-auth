import  useForm  from '../hooks/useForm';
import {useEffect} from 'react';
import { Link } from 'react-router-dom'

export default function Register(props) {
	const {values, handleChange, setValues} = useForm({});

	function handleSubmit(evt) {
		evt.preventDefault();
		props.onRegister({
			email: values.email,
			password: values.password
		});
	}

	useEffect(() => {
		setValues({ email: '', password: ''})
  }, []);

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
					value={values.email || ""}
					onChange={handleChange}
					autoComplete="off"
				/>
				<input
					className="auth__form-input"
					placeholder="Пароль"
					name="password"
					type="password"
					required
					value={values.password || ""}
					onChange={handleChange}
					autoComplete="off"
				/>
				<button
					className="auth__submit"
					type="submit">
					Зарегистрироваться
				</button>
				<div className="auth__signup">
					<span className="auth__signup-text">Уже зарегистрированы?</span>
					<Link
						to="/sign-in"
						className="auth__signup-link">
						Войти
					</Link>
				</div>
			</form>
		</section>
	);
}