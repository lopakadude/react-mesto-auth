import { usePopupClose } from "../hooks/usePoppupClose";
import { useContext } from 'react';
import { AppContext} from "../contexts/AppContext";

export default function ImagePopup({name, card}) {
	const closeAllPopups = useContext(AppContext).closeAllPopups
	usePopupClose(card.link, closeAllPopups);

	return (
		<div className={`popup popup_type_${name} ${card.link ? 'popup_opened' : ''}`}>
			<div className="popup-image__container">
				<button type="button" className="popup__close" onClick={closeAllPopups}></button>
				<figure className="popup-image__figure">
					<img className="popup-image__image" src={card.link} alt={card.name} />
					<figcaption className="popup-image__name">{card.name}</figcaption>
				</figure>
			</div>
		</div>
	)
}
