import React from 'react'
import logoPath from '../Images/Header/mesto-russia.svg'

function Header() {
	return (
		<header className="header">
			<img className="header__logo" src={logoPath} alt="логотип место" />
		</header>
	)
}

export default Header