import React from "react";

function EditAvatarPopup(props) {

  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  return (
    <div className={`popup popup_for-${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__heading">Обновить аватар</h2>
        <form className={`popup__form popup__form_type_${props.name}`} name={props.name} onSubmit={handleSubmit} noValidate>
          <input className="popup__input" id="linkforava" name="link" placeholder="Ссылка на картинку" type="url" ref={inputRef} required />
          <span className="popup__error linkforava-error"></span>
          <input className="popup__submit" type="submit" value="Сохранить" />
        </form>
        <button className="popup__close-icon" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default EditAvatarPopup;