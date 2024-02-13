import { Link } from 'react-router-dom';
import { PiUserThin } from 'react-icons/pi';
import s from './Menu.module.css';
import logo from '../../assets/basic-logo-lined.svg';

function MenuBar() {
  return (
    <div className={s.wrapper}>
      <div className={s.logoPart}>
        <Link to="/main">
        <img
          src={logo}
          className={s.logo}
          alt="logo"
        />
          </Link>
      </div>
      <div className={s.buttons}>
        <Link to="/mypage" className={s.buttons}>
          <PiUserThin className={s.button} />
        </Link>
      </div>
    </div>
  );
}

export default MenuBar;
