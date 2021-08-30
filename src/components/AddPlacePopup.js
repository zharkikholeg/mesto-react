import React from "react";

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onPlaceSubmit({
      name: name,
      link: link
    })
  }

  return (
    <div className={`popup popup_for-${props.name} ${props.isOpen ? 'popup_active' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__heading">Новое место</h2>
        <form className={`popup__form popup__form_type_${props.name}`} name={props.name} onSubmit={handleSubmit} noValidate>
          <input className="popup__input" type="text" id="placename" name="placename" placeholder="Название" minLength="2" maxLength="30" onChange={handleNameChange} required />
          <span className="popup__error placename-error"></span>
          <input className="popup__input" id="link" name="link" placeholder="Ссылка на картинку" type="url" onChange={handleLinkChange} required />
          <span className="popup__error link-error"></span>
          <input className="popup__submit" type="submit" value="Создать" />
        </form>
        <button className="popup__close-icon" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default AddPlacePopup;