import classes from './Header.module.css';

function Header({ onLoginClick }) {
  const openLogin = () => {
    onLoginClick();
  };
  return (
    <header className={classes.header}>
      <div className={`${classes.title} ${classes.div}`}>푸드레코드</div>
      <div className={`${classes.login} ${classes.div}`} onClick={openLogin}>
        로그인
      </div>
    </header>
  );
}

export default Header;
