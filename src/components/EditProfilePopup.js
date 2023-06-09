import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useContext, useEffect } from 'react';
import { AppContext} from "../contexts/AppContext";
import  useForm  from '../hooks/useForm';

export default function EditProfilePopup(props) {
	const currentUser = useContext(CurrentUserContext);
	const isLoading = useContext(AppContext).isLoading
	const {values, handleChange, setValues} = useForm({});

	useEffect(() => {
		setValues({name: currentUser.name, about: currentUser.about})
	}, [currentUser, props.isOpen]);


	function handleSubmit(evt) {
		evt.preventDefault();

		props.onUpdateUser({
			name: values.name,
			about: values.about,
		});
	}

	return (
		<PopupWithForm
			name="profile"
			title="Редактировать профиль"
			isOpen={props.isOpen}
			onSubmit={handleSubmit}
			submit={isLoading ? "Сохранение" : "Сохранить"}>
			<input
				type="text"
				id="name-input"
				name="name"
				className="popup__input popup__input_target_name"
				placeholder="Имя"
				required minLength="2" maxLength="40"
				onChange={handleChange}
				value={values.name || ''} />
			<span className="popup__input-error name-input-error"></span>
			<input
				type="text"
				id="description-input"
				name="about"
				className="popup__input popup__input_target_description"
				placeholder="Вид деятельности"
				required minLength="2" maxLength="200"
				onChange={handleChange}
				value={values.about || ''} />
			<span className="popup__input-error description-input-error">
			</span>
		</PopupWithForm>
	)
}

