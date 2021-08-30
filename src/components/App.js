import React from "react"
import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import PopupWithForm from "./PopupWithForm.js"
import ImagePopup from "./ImagePopup.js"
import api from "../utils/Api.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"
import EditProfilePopup from "./EditProfilePopup.js"
import EditAvatarPopup from "./EditAvatarPopup.js"
import AddPlacePopup from './AddPlacePopup.js'


function App() {

  const defaultUser = {
    name: "Loading",
    about: "Loading",
    avatar: "https://yandex.com"
  }

  const [isEditProfilePopupOpen, setEditStatus] = React.useState(false);
  const [isAddPlacePopupOpen, setAddStatus] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvaStatus] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(defaultUser);
  const [cards, setCards] = React.useState([]);


  React.useEffect(() => {
    api.getUser()
      .then(res => {
        setCurrentUser(res);
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  React.useEffect(() => {
    api.getAllCards()
      .then(res => {
        setCards(res);
      }).catch((err) => {
        console.log(err);
      });
  }, []);


  function handleLikeClick(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    //Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    } else {
      api.removeLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    }

  }

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
  }

  // Проверяем, какой именно попап открыт, чтобы не задействовать хук всегда по 3 раза
  function closeAllPopups() {
    isEditProfilePopupOpen && setEditStatus(false);
    isAddPlacePopupOpen && setAddStatus(false);
    isEditAvatarPopupOpen && setAvaStatus(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    api.editUser(name, about)
      .then((res) => {
        //console.log(res);
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      }
      )
  }

  function handleUpdateAvatar({ avatar }) {
    //console.log(avatar);
    api.changeAvatar(avatar)
      .then((res) => {
        //console.log(res);
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      })

  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((res) => {
        setCards([res, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      })
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then((res) => {
        setCards(cards.filter(function (card) {
          return card._id !== cardId;
        }))
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onLikeClick={handleLikeClick} onCardDelete={handleCardDelete} />
        <Footer />
        <EditProfilePopup name="editing" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup name="adding" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onPlaceSubmit={handleAddPlaceSubmit} />
        <EditAvatarPopup name="ava" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm name="submit" title="Вы уверены?">
          <input className="popup__submit popup__submit_type-submit" type="submit" value="Да" />
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>



    </div >
  );
}



export default App;
