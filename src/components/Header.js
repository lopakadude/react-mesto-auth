import logoPath from '../Images/Header/mesto-russia.svg';
import { Route, Routes, Link } from 'react-router-dom';

function Header(props) {
	return (
		<header className="header">
			<img className="header__logo" src={logoPath} alt="логотип место" />
			<Routes>
				<Route path="/sign-in"
					element={
						<Link to="/sign-up" className="header__link header__link_type_initiation">
							Регистрация
						</Link>} />
				<Route path="/sign-up"
					element={
						<Link to="/sign-in" className="header__link header__link_type_initiation">
							Войти
						</Link>} />
				<Route path="/"
					element={
						<div className="header__user">
							<span className="header__email">{props.email}</span>
							<Link
								to="/sign-in"
								className="header__link header__link_type_out"
								onClick={props.onSignOut}
							>
								Выйти
							</Link>
						</div>
					} />
			</Routes>
		</header>
	)
}

export default Header