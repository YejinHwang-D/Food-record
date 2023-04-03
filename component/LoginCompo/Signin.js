import { useState, Fragment } from 'react';
import classes from '../Login.module.css';

function Signin({ signinHandler, switchSignModeHandler }) {
  const [loginData, setLoginData] = useState({
    id: '',
    password: '',
  });

  function changeHandler(e) {
    const enteredName = e.target.name;
    const enteredValue = e.target.value;
    setLoginData({
      ...loginData,
      [enteredName]: enteredValue,
    });
  }

  function submitHandler(e) {
    e.preventDefault();
    signinHandler(loginData);
  }

  return (
    <Fragment>
      <form className={classes.signin} onSubmit={submitHandler}>
        <p>로그인</p>
        <div>
          <label htmlFor="id">아이디</label>
          <input
            className={classes.modal_input}
            id="id"
            name="id"
            value={loginData.id}
            placeholder="아이디를 입력해주세요."
            onChange={changeHandler}
          ></input>
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            className={classes.modal_input}
            id="password"
            name="password"
            value={loginData.password}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={changeHandler}
          ></input>
        </div>

        <button className={classes.modal_btn} type="submit">
          로그인
        </button>
      </form>
      <div className={classes.signup}>
        <p>{`아직 회원이 아니신가요?\n푸드레코드와 함께 해주세요!`}</p>
        <button
          className={`${classes.modal_btn} ${classes.signup_btn}`}
          onClick={switchSignModeHandler}
        >
          회원가입
        </button>
      </div>
    </Fragment>
  );
}

export default Signin;
