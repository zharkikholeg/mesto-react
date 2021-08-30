import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"

function EditProfilePopup(props) {

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <div className={`popup popup_for-${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__heading">Редактировать профиль</h2>
        <form className={`popup__form popup__form_type_${props.name}`} name={props.name} onSubmit={handleSubmit} noValidate>
          <input className="popup__input " type="text" value={name} onChange={handleNameChange} id="name" name="name" minLength="2" maxLength="40" required />
          <span className="popup__error name-error"></span>
          <input className="popup__input" type="text" value={description} onChange={handleDescriptionChange} id="bio" name="bio" minLength="2" maxLength="200" required />
          <span className="popup__error bio-error"></span>
          <input className="popup__submit" type="submit" value="Сохранить" />
        </form>
        <button className="popup__close-icon" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default EditProfilePopup;