import React, { useState, useRef } from 'react';
import CloseBtn from './CloseBtn';
import classes from './Dialog.module.css';

function Dialog({ onClose, onAddItem }) {
  const [inputs, setInputs] = useState({
    category: '',
    food_name: '',
    date: '',
    store_name: '',
    comment: '',
    image: '',
  });
  const image_preview = useRef();
  const image_input = useRef();

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === 'image') {
      const imgURL = URL.createObjectURL(e.target.files[0]);
      value = imgURL;
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
    onAddItem(inputs, onClose);
  }

  function closeHandling(e) {
    onClose();
  }

  return (
    <div className={classes.modal_background}>
      <div className={classes.modal_section}>
        <CloseBtn closeHandling={closeHandling} />
        <form className={classes.dialog_form} onSubmit={submitHandling}>
          <div className={classes.form_section}>
            <div className={classes.left_section}>
              <label htmlFor="category">카테고리명</label>
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
              <label htmlFor="food_name">음식명</label>
              <input
                required
                type="text"
                className="modal_input"
                name="food_name"
                id="food_name"
                onChange={handleChange}
              ></input>
              <label htmlFor="date">먹은 날짜</label>
              <input
                required
                type="date"
                name="date"
                id="date"
                onChange={handleChange}
              ></input>
              <label htmlFor="store_name">상호명</label>
              <input
                type="text"
                className="modal_input"
                name="store_name"
                id="store_name"
                onChange={handleChange}
              ></input>
            </div>
            <div className={classes.middle_section}>
              <label htmlFor="comment">한줄평가</label>
              <textarea
                name="comment"
                id="comment"
                cols="30"
                rows="5"
                onChange={handleChange}
              ></textarea>
              <p>입력하신 곳이 아래 주소가 맞나요?</p>
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