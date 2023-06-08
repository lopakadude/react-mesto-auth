import { usePopupClose } from "../hooks/usePoppupClose";

export default function PopupWithForm({name, title, isOpen, onClose, onSubmit, submit, children}) {
	usePopupClose(isOpen, onClose);

	return (
		<div 
		className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
		>
			<div className="popup__container">
				<button
					onClick={onClose}
					type="button"
					className="popup__close"/>
				<h2
					className="popup__mission popup__mission_content_delete">{title}
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