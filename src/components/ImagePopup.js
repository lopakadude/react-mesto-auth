import { usePopupClose } from "../hooks/usePoppupClose";

export default function ImagePopup({name, card, onClose}) {
	usePopupClose(card.link, onClose);

	return (
		<div className={`popup popup_type_${name} ${card.link ? 'popup_opened' : ''}`}>
			<div className="popup-image__container">
				<button type="button" className="popup__close" onClick={onClose}></button>
				<figure className="popup-image__figure">
					<img className="popup-image__image" src={card.link} alt={card.name} />
					<figcaption className="popup-image__name">{card.name}</figcaption>
				</figure>
			</div>
		</div>
	)
}
