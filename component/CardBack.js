import classes from './CardBack.module.css';

function CardBack(props) {
  const back_data = props.data.value;

  return (
    <div className={`${classes.item} ${classes.card_back}`}>
      <div className={classes.address_section}></div>
      <div className={classes.text_section}>
        <p>상호명: {back_data.store_name}</p>
        <p>주소: {back_data.address}</p>
      </div>
    </div>
  );
}

export default CardBack;
