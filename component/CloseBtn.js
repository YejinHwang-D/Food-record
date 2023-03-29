import Close from '../assets/xmark-solid.svg';
import classes from './CloseBtn.module.css';

function CloseBtn({ closeHandling }) {
  return (
    <div className={classes.close_section}>
      <button type="button" onClick={closeHandling}>
        <p>닫기</p>
        <Close className={classes.close_icon} />
      </button>
    </div>
  );
}

export default CloseBtn;
