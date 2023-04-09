import { useSession, signOut } from 'next-auth/client';
import classes from './Header.module.css';
import { useRouter } from 'next/router';

function Header({ onLoginClick }) {
  const [session, loading] = useSession();
  const router = useRouter();

  function singOut() {
    alert('로그아웃되었습니다. 다시 찾아주실거죠?');
    signOut();
    router.replace('/');
  }

  const openLogin = () => {
    onLoginClick();
  };
  return (
    <header className={classes.header}>
      <div className={`${classes.title} ${classes.div}`}>푸드레코드</div>
      {session ? (
        <div className={`${classes.login} ${classes.div}`} onClick={singOut}>
          로그아웃
        </div>
      ) : (
        <div className={`${classes.login} ${classes.div}`} onClick={openLogin}>
          로그인
        </div>
      )}
    </header>
  );
}

export default Header;
