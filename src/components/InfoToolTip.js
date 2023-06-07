import successIcon from '../Images/Auth/successIcon.svg';
import failIcon from '../Images/Auth/failIcon.svg';

export default function InfoToolTip(props) {
	return (
		<div
			className={`popup popup_type_tooltip ${props.isOpen ? "popup_is-opened" : ""}`}
		>
			<div className="popup__content">
				{props.isSuccess ? (
					<>
						<img
							src={`${successIcon}`}
							alt="Регистрация прошла успешно."
							className="popup__tooltip_image"
						/>
						<p className="popup__tooltip_message">
							Вы успешно зарегистрировались!
						</p>
					</>
				) : (
					<>
						<img
							src={`${failIcon}`}
							alt="Регистрация не была выполнена."
							className="popup__tooltip_image"
						/>
						<p className="popup__tooltip_message">
							Что-то пошло не так. Попробуйте ещё раз!
						</p>
					</>
				)}
				<button type="button" className="popup__close" onClick={onClose} />
			</div>
		</div>
	);
}
