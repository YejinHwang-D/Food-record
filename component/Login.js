import React from 'react';
import CloseBtn from './CloseBtn';
import classes from './Login.module.css';

function Login({ onClose }) {
  function closeHandling(e) {
    onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('login');
  }

  return (
    <div className={classes.modal_background}>
      <div className={`${classes.modal_section} ${classes.sign}`}>
        <CloseBtn closeHandling={closeHandling} />
        <div className={classes.sign_section}>
          <form className={classes.signin} onSubmit={handleSubmit}>
            <p>로그인</p>
            <div>
              <label htmlFor="id">아이디</label>
              <input
                className={classes.modal_input}
                id="id"
                placeholder="아이디를 입력해주세요."
              ></input>
            </div>
            <div>
              <label htmlFor="password">비밀번호</label>
              <input
                className={classes.modal_input}
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
              ></input>
            </div>

            <button className={classes.modal_btn} type="submit">
              로그인
            </button>
          </form>
          <div className={classes.signup}>
            <p>{`아직 회원이 아니신가요?\n푸드레코드와 함께 해주세요!`}</p>
            <button className={`${classes.modal_btn} ${classes.signup_btn}`}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
