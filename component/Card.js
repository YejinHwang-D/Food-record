import React, { useRef, useState } from 'react';
import CardFront from './CardFront';
import CardBack from './CardBack';
import classes from './Card.module.css';

function CardView(props) {
  const [flipped, setFlipped] = useState(false);
  const card_section = useRef();

  function handleClick() {
    setFlipped(!flipped);
  }

  return (
    <div
      className={`${classes.card} ${flipped ? `${classes.is_flipped}` : ``}`}
      ref={card_section}
      onClick={handleClick}
    >
      <CardFront data={props} />
      <CardBack data={props} />
    </div>
  );
}

export default CardView;
