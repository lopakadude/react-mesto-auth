import {useEffect,useContext } from 'react';
import PopupWithForm from "./PopupWithForm";
import { AppContext} from "../contexts/AppContext";
import  useForm  from '../hooks/useForm';

export default function AddPlacePopup(props) {
	const {values, handleChange, setValues} = useForm({});
	const isLoading = useContext(AppContext).isLoading

	function handleSubmit(evt) {
		evt.preventDefault();

    props.onAddPlace({
      name: values.nameOfPlace,
      link: values.link
    })
  }

	useEffect(() => {
		setValues({ name: '', link: ''})
  }, [props.isOpen]);

	return (
		<PopupWithForm
			name="newCard"
			title="Новое место"
			isOpen={props.isOpen}
			onSubmit={handleSubmit}
			submit={isLoading ? "Создание" : "Создать"}>
			<input
				type="text"
				onChange={handleChange}
				value={values.nameOfPlace || ''}
				id="nameOfPlace-input"
				className="popup__input popup__input_target_name-card" name="nameOfPlace"
				placeholder="Название"
				required minLength="2" maxLength="30" />
			<span
				className="popup__input-error nameOfPlace-input-error">
			</span>
			<input
				type="url"
				onChange={handleChange}
				value={values.link || ''}
				id="linkOfPlace-input"
				className="popup__input popup__input_target_link"
				name="link"
				placeholder="Ссылка на картинку" required />
			<span className="popup__input-error linkOfPlace-input-error"></span>
		</PopupWithForm>
	)
}
