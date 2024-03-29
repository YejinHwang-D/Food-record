import { Fragment, useState } from 'react';
import CloseBtn from '../CloseBtn';
import classes from './AddressModal.module.css';
import MapContainer from './MapContainer';

function AddressModal({ closeHandling, addrInputHandling }) {
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');

  function onChange(event) {
    setInputText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setPlace(inputText);
    setInputText('');
  }

  return (
    <Fragment>
      <div className={classes.modal_background}>
        <div className={classes.modal_section}>
          <CloseBtn closeHandling={closeHandling} />
          <div className={classes.addr_section}>
            <form onSubmit={handleSubmit} className={classes.keyword_form}>
              <input
                placeholder="검색어를 입력하세요"
                onChange={onChange}
                value={inputText}
                className={classes.keyword_input}
              />
              <button type="submit" className={classes.search_btn}>
                검색
              </button>
            </form>
            <MapContainer
              searchPlace={place}
              addrInputHandling={addrInputHandling}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AddressModal;
