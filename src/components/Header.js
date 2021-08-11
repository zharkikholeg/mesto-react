import React from "react";
import logoPath from "../images/header-logo.svg"

function Hedaer(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="лого"/>
    </header>
  )
}

export default Hedaer;