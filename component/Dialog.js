import React, { useState, useRef } from 'react';
import useModals from './custom/useModals';
import CloseBtn from './CloseBtn';
import AddressModal from './Address/AddressModal';
import classes from './Dialog.module.css';

function Dialog({ onAddItem, onClose, setMainData }) {
  const [inputs, setInputs] = useState({
    category: '',
    food_name: '',
    date: '',
    store_name: '',
    comment: '',
    image: '',
    score: null,
    address: {
      place_name: '',
    },
  });
  const image_preview = useRef();
  const image_input = useRef();

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === 'image') {
      const formData = new FormData();
      formData.append(e.target.files[0].name, e.target.files[0]);
      value = formData;

      const imgURL = URL.createObjectURL(e.target.files[0]);
      image_input.current.setAttribute('style', 'display: none;');
      image_preview.current.setAttribute('style', 'display: flex');
      image_preview.current.children[0].setAttribute('src', imgURL);
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(name, value);
  }

  function submitHandling(e) {
    e.preventDefault();
    onAddItem(inputs, onClose, setMainData);
  }

  function addrInputHandling(enteredData) {
    setInputs({
      ...inputs,
      address: enteredData,
    });
    closeAddr();
  }

  const { openModal, closeModal } = useModals();
  const closeAddr = () => {
    closeModal(AddressModal);
  };

  const openAddr = () => {
    openModal(AddressModal, {
      closeHandling: closeAddr,
      addrInputHandling: addrInputHandling,
    });
  };

  return (
    <div className={classes.modal_background}>
      <div className={classes.modal_section}>
        <CloseBtn closeHandling={onClose} />
        <form className={classes.dialog_form} onSubmit={submitHandling}>
          <div className={classes.form_section}>
            <div className={classes.left_section}>
              <label htmlFor="category">
                카테고리명
                <select
                  required
                  defaultValue=""
                  name="category"
                  id="category"
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    카테고리명
                  </option>
                  <option value="식사">식사</option>
                  <option value="음료">음료</option>
                  <option value="디저트">디저트</option>
                </select>
              </label>

              <label htmlFor="food_name">
                음식명
                <input
                  required
                  type="text"
                  className={classes.modal_input}
                  name="food_name"
                  id="food_name"
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="date">
                먹은 날짜
                <input
                  required
                  type="date"
                  className={classes.modal_input}
                  name="date"
                  id="date"
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="store_name">
                상호명
                <input
                  type="text"
                  className={classes.modal_input}
                  name="store_name"
                  id="store_name"
                  value={inputs.address.place_name || ''}
                  onChange={handleChange}
                ></input>
                <button
                  type="button"
                  onClick={openAddr}
                  className={classes.addr_btn}
                >
                  상호명 찾기
                </button>
              </label>
            </div>

            <div className={classes.middle_section}>
              <label htmlFor="comment">
                한줄평가
                <textarea
                  name="comment"
                  id="comment"
                  cols="30"
                  rows="5"
                  onChange={handleChange}
                ></textarea>
              </label>
              <label htmlFor="score">
                평점
                <input
                  required
                  className={classes.modal_input}
                  name="score"
                  id="score"
                  type="number"
                  onChange={handleChange}
                  pattern="[0-5]{0,1}$"
                />
              </label>
            </div>
            <div className={classes.right_section}>
              <p>이미지는 하나만 등록 가능해요.</p>
              <label htmlFor="input_file">
                <div ref={image_input} className={classes.image_file}>
                  파일 업로드
                </div>
                <div
                  ref={image_preview}
                  className={`${classes.image_file} ${classes.preview}`}
                >
                  <img src=""></img>
                </div>
              </label>
              <input
                type="file"
                name="image"
                id="input_file"
                className={classes.input_file_btn}
                accept="image/*"
                onChange={handleChange}
              />
              <p>등록된 이미지는 자동으로 대표사진으로 등록됩니다. :)</p>
            </div>
          </div>
          <button className={classes.modal_btn} type="submit">
            등록
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dialog;
