import successIcon from '../Images/Auth/successIcon.svg';
import failIcon from '../Images/Auth/failIcon.svg';
import { usePopupClose } from "../hooks/usePoppupClose";
import { useContext } from 'react';
import { AppContext} from "../contexts/AppContext";

export default function InfoToolTip({name, isOpen, isSuccess}) {
	const closeAllPopups = useContext(AppContext).closeAllPopups
	usePopupClose(isOpen, closeAllPopups);
	return (
		<div 
		className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
		>
			<div className="popup__container">
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
					onClick={closeAllPopups}
					type="button"
					className="popup__close"/>
			</div>
		</div>
	);
}
