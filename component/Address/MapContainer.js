import { useRef, useEffect } from 'react';
import classes from './MapContainer.module.css';

function MapContainer({ searchPlace }) {
  const map_container = useRef();
  let info_window, map, ps;

  useEffect(() => {
    const { kakao } = window;
    kakao.maps.load(() => {
      if (searchPlace !== '') {
        initMap();
      }
    });
  }, [searchPlace]);

  function initMap() {
    info_window = new kakao.maps.InfoWindow({ zIndex: 1 });
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    map = new kakao.maps.Map(map_container.current, options);
    ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchPlace, placesSearchCB);
  }

  function placesSearchCB(data, status) {
    console.log('data: ', data);
    console.log('status: ', status);
    if (status === kakao.maps.services.Status.OK) {
      let bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }
      map.setBounds(bounds);
      console.log(map.a);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 없습니다.');
      return;
    } else {
      alert('[ERROR] 검색 과정에서 오류가 발생했습니다.');
      return;
    }
  }

  function displayMarker(place) {
    let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });
    kakao.maps.event.addListener(marker, 'click', function () {
      info_window.setContent(`<div>${place.place_name}</div>`);
      info_window.open(map, marker);
      alert(place.place_name);
    });
  }

  return <div className={classes.map_div} ref={map_container}></div>;
}

export default MapContainer;
