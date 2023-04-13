import React, { useEffect, useRef, useState } from 'react';
import CardFront from './CardFront';
import CardBack from './CardBack';
import classes from './Card.module.css';

function CardView(props) {
  const [flipped, setFlipped] = useState(false);
  const card_section = useRef();

  function handleClick() {
    setFlipped(!flipped);
  }

  useEffect(() => {
    if (props.style) {
      card_section.current.style = 'width: 23vw; height: 18em;';
    }
  }, []);

  return (
    <div
      className={`${classes.card} ${flipped ? `${classes.is_flipped}` : ``}`}
      ref={card_section}
      onClick={handleClick}
    >
      <CardFront data={props.value} />
      <CardBack data={props.value} />
    </div>
  );
}

export default CardView;
