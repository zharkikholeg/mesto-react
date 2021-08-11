import React from "react";

function ImagePopup(props) {

  console.log(props);
  return (
    <div className={`popup popup_for-preview ${props.card !== undefined && "popup_active"}`}>
      <div className="popup__preview-container">
        <button className="popup__close-icon popup__close-icon_for-preview" type="button" onClick={props.onClose}></button>
        <img src={props.card !== undefined ? props.card.link : "#"} alt="#" className="popup__image" onClick={props.onClose}/>
        <h4 className="popup__name">{props.card !== undefined ? props.card.name : ""}</h4>
      </div>
    </div>
  )
}


export default ImagePopup;