import { useRef, useEffect, Fragment } from 'react';
import classes from './MapContainer.module.css';

function MapContainer({ searchPlace, addrInputHandling }) {
  const map_container = useRef();
  const map_list_container = useRef();
  let info_window, map, ps;

  useEffect(() => {
    const { kakao } = window;
    kakao.maps.load(() => {
      if (searchPlace !== '') {
        initMap();
      }
    });
  }, [searchPlace]);

  function enteredDataHandling(enteredData) {
    addrInputHandling(enteredData);
  }

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
    if (status === kakao.maps.services.Status.OK) {
      displayPlaces(data);
      let bounds = new kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      }
      map.setBounds(bounds);
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
      enteredDataHandling(place);
    });
  }

  function displayPlaces(places) {
    const fragment = document.createDocumentFragment();
    const bounds = new kakao.maps.LatLngBounds();

    removeAllChildNods(map_list_container);

    for (let i = 0; i < places.length; i++) {
      const place_position = new kakao.maps.LatLng(places[i].y, places[i].x);
      const marker = addMarker(place_position, i);
      const item_element = getListItem(i, places[i]);

      bounds.extend(place_position);
      (function (marker, title) {
        kakao.maps.event.addListener(marker, 'mouseover', function () {
          displayInfowindow(marker, title);
        });
        kakao.maps.event.addListener(marker, 'mouseout', function () {
          info_window.close();
        });

        item_element.onclick = function () {
          enteredDataHandling(places[i]);
        };
        item_element.onmouseover = function () {
          info_window.close();
          displayInfowindow(marker, title);
        };
      })(marker, places[i].place_name);
      fragment.appendChild(item_element);
    }

    map_list_container.current.appendChild(fragment);
    map.setBounds(bounds);
  }

  function getListItem(index, places) {
    const element = document.createElement('li');
    let item_str =
      '<span class="markerbg marker_' +
      (index + 1) +
      '"></span>' +
      '<div class="info">' +
      '   <h5>' +
      places.place_name +
      '</h5>';

    if (places.road_address_name) {
      item_str +=
        '    <span>' +
        places.road_address_name +
        '</span>' +
        '   <span class="jibun gray">' +
        places.address_name +
        '</span>';
    } else {
      item_str += '    <span>' + places.address_name + '</span>';
    }
    element.innerHTML = item_str;

    return element;
  }

  function addMarker(position, idx, title) {
    var imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    return marker;
  }

  function removeAllChildNods(element) {
    while (element.current.hasChildNodes()) {
      element.current.removeChild(element.current.lastChild);
    }
  }

  // 목록 또는 마커 클릭 시 호출되는 함수. (인포윈도우에 장소명 표시)
  function displayInfowindow(marker, title) {
    const content = `<div>${title}</div>`;
    info_window.setContent(content);
    info_window.open(map, marker);
  }

  return (
    <section className={classes.address_section}>
      <div className={classes.map_list} ref={map_list_container}></div>
      <div className={classes.map_div} ref={map_container}></div>;
    </section>
  );
}

export default MapContainer;
