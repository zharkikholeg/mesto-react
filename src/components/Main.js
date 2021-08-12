import React from "react";
import penPath from "../images/pen.svg"
import api from "../utils/Api.js"
import Card from "./Card.js"

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [overlayStatus, setOverLayStatus] = React.useState(false);

  React.useEffect(() => {
    api.getUser()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      }).catch((err) => {
        console.log(err); 
      });
    api.getAllCards()
      .then(res => {
        setCards(res);
      }).catch((err) => {
        console.log(err); 
      });
    }, []);

  const cardItems = cards.map((card) => (
    <Card card={card} key={card._id} onCardClick={props.onCardClick}/>
  ))

  function handleMouseEnter() {
    setOverLayStatus(true);
  }

  function handleMouseLeave() {
    setOverLayStatus(false);
  }

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-wrapper" onClick={props.onEditAvatar} onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className={`profile__avatar-overlay ${overlayStatus ? "profile__avatar-overlay_active" : ""}`} >
            <img src={penPath} alt="" className="profile__avatar-overlay-image"/>
          </div>
          <img className="profile__avatar" src={userAvatar} alt="аватар"/>
        </div>
        <div className="profile__info">
          <div className="profile__info-wrapper">
            <h1 className="profile__info-name">{userName}</h1>
              <button className="profile__info-edit" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__info-bio">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>

      <section>
        <ul className="elements">
          {cardItems}
        </ul>
      </section>

    </main>
  )
}

export default Main;