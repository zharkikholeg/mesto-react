import React from "react"
import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import PopupWithForm from "./PopupWithForm.js"
import ImagePopup from "./ImagePopup.js"



function App() {

  const [isEditProfilePopupOpen, setEditStatus] = React.useState(false);
  const [isAddPlacePopupOpen, setAddStatus] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvaStatus] = React.useState(false);
  //const [isImagePopupOpen, setImagePopup] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(undefined);


  function handleEditProfileClick() {
    setEditStatus(true);
  }

  function handleAddPlaceClick() {
    setAddStatus(true);
  }

  function handleEditAvatarClick() {
    setAvaStatus(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    //setImagePopup(true);
  }

  // Проверяем, какой именно попап открыт, чтобы не задействовать хук всегда по 3 раза
  function closeAllPopups() {
    isEditProfilePopupOpen && setEditStatus(false);
    isAddPlacePopupOpen && setAddStatus(false);
    isEditAvatarPopupOpen && setAvaStatus(false);
    setSelectedCard(undefined);
  }
  
  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
      <Footer />

      <PopupWithForm name="editing" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>
      {/* <div className="popup popup_for-editing">
        <div className="popup__container">
          <h2 className="popup__heading">Редактировать профиль</h2>
          <form className="popup__form popup__form_type_bio" name="bio" noValidate>
            <input className="popup__input " type="text" id="name" name="name" minLength="2" maxLength="40" required />
            <span className="popup__error name-error"></span>
            <input className="popup__input" type="text" id="bio" name="bio" minLength="2" maxLength="200" required />
            <span className="popup__error bio-error"></span>
            <input className="popup__submit" type="submit" value="Сохранить" />
          </form>
          <button className="popup__close-icon" type="button"></button>
        </div>
      </div> */}
      
      <PopupWithForm name="adding" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
      {/* <div className="popup popup_for-adding">
        <div className="popup__container">
          <h2 className="popup__heading">Новое место</h2>
          <form className="popup__form popup__form_type_place" name="place" noValidate>
            <input className="popup__input" type="text" id="placename" name="placename" placeholder="Название" minLength="2" maxLength="30" required />
            <span className="popup__error placename-error"></span>
            <input className="popup__input" id="link" name="link" placeholder="Ссылка на картинку" type="url" required />
            <span className="popup__error link-error"></span>
            <input className="popup__submit" type="submit" value="Создать" />
          </form>
          <button className="popup__close-icon" type="button"></button>
        </div>
      </div> */}

      <PopupWithForm name="ava" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
      {/* <div className="popup popup_for-ava">
        <div className="popup__container">
          <h2 className="popup__heading">Обновить аватар</h2>
          <form className="popup__form popup__form_type_ava" name="place" noValidate>
            <input className="popup__input" id="linkforava" name="link" placeholder="Ссылка на картинку" type="url" required />
            <span className="popup__error linkforava-error"></span>
            <input className="popup__submit" type="submit" value="Сохранить" />
          </form>
          <button className="popup__close-icon" type="button"></button>
        </div>
      </div> */}

      <PopupWithForm name="submit" title="Вы уверены?"/>
      {/* <div className="popup popup_for-submit">
        <div className="popup__container popup__container_for-submit">
          <h2 className="popup__heading">Вы уверены?</h2>
          <form className="popup__form popup__form_type_submit" name="place" noValidate>
            <input className="popup__submit popup__submit_type-submit" type="submit" value="Да" />
          </form>
          <button className="popup__close-icon" type="button"></button>
        </div>
      </div> */}

      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

          
    </div>
  );
}



export default App;
