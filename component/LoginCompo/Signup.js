import { Fragment, useState } from 'react';
import classes from '../Login.module.css';

function Singup({ signupHandler, switchSignModeHandler }) {
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
    signupHandler(loginData);
  }
  return (
    <Fragment>
      <form className={classes.signin} onSubmit={submitHandler}>
        <p>회원가입</p>
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
          회원가입
        </button>
      </form>
      <div className={classes.signup}>
        <p>{`이미 푸드레코드 회원이신가요?\n로그인으로 회원 혜택을 누려보세요!`}</p>
        <button
          className={`${classes.modal_btn} ${classes.signup_btn}`}
          onClick={switchSignModeHandler}
        >
          로그인으로 이동
        </button>
      </div>
    </Fragment>
  );
}

export default Singup;
