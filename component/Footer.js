import Github from '../assets/github.svg';
import classes from './Footer.module.css';

function Footer() {
  const url = `https://github.com/YejinHwang-D/Food-record`;

  return (
    <footer className={classes.footer}>
      <div className={classes.source}>
        <p>
          {`사용한 라이브러리 및 디자인 소스 출처
            Material UI: https://mui.com/material-ui
            grommet: https://v2.grommet.io/
            Font Awesome: https://fontawesome.com/
          `}
        </p>
        이미지 출처{' '}
        <a href="https://kr.freepik.com/free-photo/still-life-of-fast-food-dishes_20546599.htm#query=food&position=3&from_view=search&track=sph">
          Freepik
        </a>
        <p>
          {`
            Thanks for attributing my project. :)`}
        </p>
      </div>
      <div className={classes.info}>
        <p>
          {`이 프로젝트는 1인 프로젝트로 개발되었어요!
                기획부터 디자인, 개발, 배포까지 모두 혼자의 힘으로 하다보니 부족한 점이 많습니다.
                혹시 소중한 시간을 내어 피드백을 주실 수 있다면 
                hyj3463@naver.com 로 연락주세요. :)
                감사합니다. (●'◡'●)`}
        </p>
        <div>
          <span>{`사이트에 대한 코드는 여기서 확인하실 수 있어요!`}</span>
          <Github
            className={classes.github_icon}
            onClick={() => {
              window.open(url);
            }}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
