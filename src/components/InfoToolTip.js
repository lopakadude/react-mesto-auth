import successIcon from '../Images/Auth/successIcon.svg';
import failIcon from '../Images/Auth/failIcon.svg';
import { usePopupClose } from "../hooks/usePoppupClose";

export default function InfoToolTip({name, isOpen, onClose, isSuccess}) {
	usePopupClose(isOpen, onClose);
	return (
		<div 
		className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
		>
			<div className="popup__container popup__container_type_tooltip">
				{isSuccess ? (
					<>
						<img
							src={`${successIcon}`}
							alt="Регистрация прошла успешно."
							className="popup__tooltip-icon"
						/>
						<p className="popup__tooltip-message">
							Вы успешно зарегистрировались!
						</p>
					</>
				) : (
					<>
						<img
							src={`${failIcon}`}
							alt="Регистрация не была выполнена."
							className="popup__tooltip-icon"
						/>
						<p className="popup__tooltip-message">
							Что-то пошло не так. Попробуйте ещё раз!
						</p>
					</>
				)}
				<button
					onClick={onClose}
					type="button"
					className="popup__close"/>
			</div>
		</div>
	);
}
