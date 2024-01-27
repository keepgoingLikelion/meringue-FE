/* eslint-disable import/no-extraneous-dependencies */
import { PiUserThin } from 'react-icons/pi';
import s from '../styles/Menu.module.css';
import logo from '../assets/basic-logo-lined.svg';

function MenuBar() {
  return (
    <div className={s.wrapper}>
      <div className={s.logoPart}>
        <img
          src={logo}
          className={s.logo}
          alt="logo"
        />
      </div>
      <div className={s.buttons}>
        <PiUserThin
          type="button"
          className={s.button}
        />
      </div>
    </div>
  );
}

export default MenuBar;
