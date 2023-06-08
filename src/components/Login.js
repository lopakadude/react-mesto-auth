import  useForm  from '../hooks/useForm';
import {useEffect} from 'react';

export default function Login(props) {
	const {values, handleChange, setValues} = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin({
			email: values.email,
			password: values.password
		});
  }

	useEffect(() => {
		setValues({ email: '', password: ''})
  }, []);


  return (
    <>      
      <section className="auth">
        <h2 className="auth__title">Вход</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className="auth__form-input"
            placeholder="Email"
            name="email"
            type="email"
            required
            value={values.email || ""}
          ></input>
          <input
            onChange={handleChange}
            className="auth__form-input"
            placeholder="Пароль"
            name="password"
            type="password"
            required
            value={values.password || ""}
          ></input>
          <button className="auth__submit" type="submit">
            Войти
          </button>
        </form>
      </section>
    </>
  );
}
