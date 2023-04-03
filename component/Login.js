import CloseBtn from './CloseBtn';
import Signin from './LoginCompo/Signin';
import Signup from './LoginCompo/Signup';
import classes from './Login.module.css';
import { useState } from 'react';
import { signIn } from 'next-auth/client';
import { Router } from 'next/router';

async function createUser(enteredData) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(enteredData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong...');
  }
  return data;
}

function Login({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  function closeHandling(e) {
    onClose();
  }

  function switchSignModeHandler() {
    setIsLogin(!isLogin);
  }

  async function signHandler(enteredData) {
    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        id: enteredData.id,
        password: enteredData.password,
      });
      if (!result.error) {
        alert('환영합니다! 오늘도 맛있는 식사하셨나요?');
        onClose();
      }
    } else {
      try {
        const result = await createUser(enteredData);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className={classes.modal_background}>
      <div className={`${classes.modal_section} ${classes.sign}`}>
        <CloseBtn closeHandling={closeHandling} />
        <div className={classes.sign_section}>
          {isLogin ? (
            <Signin
              signinHandler={signHandler}
              switchSignModeHandler={switchSignModeHandler}
            />
          ) : (
            <Signup
              signupHandler={signHandler}
              witchSignModeHandler={switchSignModeHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
