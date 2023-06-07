import PopupWithForm from "./PopupWithForm";
import { useEffect, useContext } from 'react';
import { IsLoading } from "../contexts/IsLoading";
import  useForm  from '../hooks/useForm';

export default function EditAvatarPopup(props) {
	const {values, handleChange, setValues} = useForm({});
	const isLoading = useContext(IsLoading);
	function handleSubmit(evt) {
		evt.preventDefault();
		props.onUpdateAvatar({
			avatar: values.avatar,
		});
	}

	useEffect(() => {
     setValues({avatar: ''}) ;
  }, [props.isOpen]);

	return (
		<PopupWithForm
			name="avatar"
			title="Обновить аватар"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			submit={isLoading? "Сохранение" : "Сохранить"}>
			<input
				value={values.avatar}
				onChange={handleChange}
				type="url"
				id="linkAvatarInput"
				className="popup__input popup__input-target-link-avatar"
				name="avatar"
				placeholder="Ссылка на картинку"
				required />
			<span
				className="popup__input-error popup__input-error_content_avatar linkAvatarInput-error">
			</span>
		</PopupWithForm>
	)
}

