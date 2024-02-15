import axios from 'axios';
import style from './LoginView.module.css';
import basicLogoLined from '../../assets/basic-logo-lined.svg';
import questionMark from '../../assets/question-mark.svg';
import loginButton from '../../assets/login-button.svg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodayPostStore } from '../../actions/todayPost';

const googleURL = 'http://localhost:8080/login';

export default function LoginView() {
  const navigation = useNavigate();
  const { todayPost } = useTodayPostStore();
  useEffect(() => {
    if (axios.defaults.headers.common.Authorization && todayPost)  {
      navigation('/main')
    }
      // window.location.href = "http://localhost:8080/login";
  }, [todayPost]);
  return (
    <div className={style.wrapp}>
      <div className={style.logoContainer}>
        <div className={style.logo}>
          <img src={basicLogoLined} title="basic-logo-lined" alt="basic-logo-lined" />
        </div>
        <div className={style.mess1}>너랑 나랑 나누는 마음 이야기</div>

        <div className={style.mess2}>
          머랭
          <img src={questionMark} title="question-mark" alt="question-mark" />
        </div>
        <div className={style.loginButton}>
          <img
            role="presentation"
            onClick={() => {
              window.location.href = googleURL;
            }}
            className={style.googleButton}
            src={loginButton}
            alt="loginButton"
          />
        </div>
      </div>
    </div>
  );
}
