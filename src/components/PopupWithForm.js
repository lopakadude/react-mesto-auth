import { usePopupClose } from "../hooks/usePoppupClose";
import {useContext } from 'react';
import { AppContext} from "../contexts/AppContext";

export default function PopupWithForm({name, title, isOpen, onSubmit, submit, children}) {
	const closeAllPopups = useContext(AppContext).closeAllPopups
	usePopupClose(isOpen, closeAllPopups);

	return (
		<div 
		className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
		>
			<div className="popup__container">
				<button
					onClick={closeAllPopups}
					type="button"
					className="popup__close"/>
				<h2
					className="popup__mission">{title}
				</h2>
				<form
					name={name}
					action="#"
					className="popup__form"
					onSubmit={onSubmit}>
					{children}
					<button
						type="submit"
						className="popup__submit">
						{submit}
					</button>
				</form>
			</div>
		</div>
	)
}