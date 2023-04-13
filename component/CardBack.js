import { useRef, useEffect } from 'react';
import classes from './CardBack.module.css';

function CardBack(props) {
  const back_data = props.data;
  const map_container = useRef();
  let map;

  useEffect(() => {
    if (back_data.address) {
      const { kakao } = window;
      kakao.maps.load(() => {
        const map_option = {
          center: new kakao.maps.LatLng(
            back_data.address.y,
            back_data.address.x
          ),
          level: 3,
        };
        map = new kakao.maps.Map(map_container.current, map_option);
        displayMarker(back_data.address);
      });
    }
  }, []);

  function displayMarker(place) {
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });
  }

  return (
    <div className={`${classes.item} ${classes.card_back}`}>
      <div className={classes.address_section} ref={map_container}></div>
      <div className={classes.text_section}>
        <p>상호명: {back_data.address ? back_data.address.place_name : null}</p>
        <p>주소: {back_data.address ? back_data.address.address_name : null}</p>
      </div>
    </div>
  );
}

export default CardBack;
