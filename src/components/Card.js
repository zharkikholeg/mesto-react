


function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }  

  return (
    <li className="element" >
      <div className="element__image-wrapper">
        <button type="button" className="element__trash"></button>
        <img className="element__image" alt="" src={props.card.link} onClick={handleClick}/>
      </div>
      <div className="element__wrapper">
        <h3 className="element__text">{props.card.name}</h3>
        <div className="element__likes-wrapper">
          <button type="button" className="element__heart"></button>
          <p className="element__likecount">0</p>
        </div> 
      </div>
    </li>
  )
}

export default Card;