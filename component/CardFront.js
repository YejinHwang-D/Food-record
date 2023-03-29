import classes from './CardFront.module.css';

function CardFront(props) {
  const front_data = props.data.value;

  return (
    <div className={`${classes.item} ${classes.card_front}`}>
      <div className={classes.image_section}>
        <img src="https://picsum.photos/id/700/500" alt="카드 이미지"></img>
      </div>
      <div className={classes.text_section}>
        <div className={classes.top}>
          <div className={classes.category}>{front_data.category}</div>
          <div className={classes.date}>{front_data.date}</div>
        </div>
        <div className={classes.middle}>
          <p>음식명: {front_data.food_name}</p>
          <p>상호명: {front_data.store_name}</p>
          <p>한줄평가: {front_data.comment}</p>
        </div>
        <div className={classes.bottom}>
          {[...Array(parseInt(front_data.score))].map((n, index) => {
            return '⭐️';
          })}
        </div>
      </div>
    </div>
  );
}

export default CardFront;
