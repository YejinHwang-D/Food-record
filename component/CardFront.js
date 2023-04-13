import classes from './CardFront.module.css';

function CardFront(props) {
  const front_data = props.data;
  if (Object.keys(front_data.image).length !== 0) {
    console.log(front_data.image.values());
  }

  return (
    <div className={`${classes.item} ${classes.card_front}`}>
      <div className={classes.image_section}>
        <img src={'https://picsum.photos/id/700/500'} alt="등록 이미지"></img>
        <img src="https://picsum.photos/id/700/500" alt="등록 이미지"></img>
      </div>
      <div className={classes.text_section}>
        <div className={classes.top}>
          <div className={classes.category}>{front_data.category}</div>
          <div className={classes.date}>{front_data.date}</div>
        </div>
        <div className={classes.middle}>
          <span>음식명: {front_data.food_name}</span>
          <p>
            상호명: {front_data.address ? front_data.address.place_name : null}
          </p>
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
