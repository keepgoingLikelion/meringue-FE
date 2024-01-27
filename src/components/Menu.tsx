/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import s from '../styles/Menu.module.css';
import logo from '../assets/basic-logo.svg';

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
        <AiFillHome
          type="button"
          className={s.button}
        />
        <FaRegUserCircle
          type="button"
          className={s.button}
        />
      </div>
    </div>
  );
}

export default MenuBar;
