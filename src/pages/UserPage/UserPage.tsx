/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import MenuBar from '../../components/Menu/Menu';
import styles from '../../styles/Layout.module.css';
import profileIcon from '../../assets/basic-logo-lined.svg';
import Calendar from '../../components/Calendar/Container';
import { useTodayPostStore } from '../../actions/todayPost';
import { useCalendarStore } from '../../actions/calendarStore';
import EmotionList from '../../components/EmotionList/EmotionList';
import s from './UserPage.module.css';
import theme from '../../styles/ThemeColor.module.css';

function Mypage() {
  const { currentDate } = useCalendarStore();
  const { todayPost, fetchTodayPost } = useTodayPostStore();
  const [todayDate, setTodayDate] = useState(new Date());

  useEffect(() => {
    setTodayDate(new Date());
  }, [currentDate]);
  useEffect(() => {
    fetchTodayPost();
  }, [fetchTodayPost]);
  if (!todayPost) {
    return <div>오늘 만든 쿠키가 없어요.</div>;
  }
  const changeThemeColor = (emotionType: number): string => {
    switch (emotionType) {
      case 1:
        return 'themeHappy';
      case 2:
        return 'themeSad';
      case 3:
        return 'themeAngry';
      case 4:
        return 'themeUpset';
      case 5:
        return 'themeSimsim';
      case 6:
        return 'themeTired';
      default:
        return 'themeHappy';
    }
  };

  return (
    <div className={`${styles.wrapper} ${theme[changeThemeColor(todayPost.emotionType)]}`}>
      <div className={styles.header}>
        <MenuBar />
      </div>
      <div className={styles.container}>
        <div className={s.profileContainer}>
          <div className={s.profileContent}>
            <h2 className={s.userName}>내이름은홍길동</h2>
            <h4 className={s.userMood}>오늘의 쿠키: 오예</h4>
          </div>
          <img
            src={profileIcon}
            alt="userIcon"
            className={s.userIcon}
          />
        </div>
        <div className={styles.contentWrapper}>
          <div className={s.calContainer}>
            <Calendar />
          </div>
          <div className={s.todayCardContainer}>
            <h4 className={s.todayDate}>
              {format(todayDate, 'yyyy년 MM월 dd일')}
            </h4>
            <div className={s.cardContent}>
              <h5 className={s.content}>
                {todayPost.content}
              </h5>
            </div>
            <Link
              type="button"
              className={s.moveButton}
              to="/post/today"
            >
              <h5>보러가기</h5>
            </Link>
          </div>
          <div className={s.userLogContainer}>
            <EmotionList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;

export const getThemeColor = (emotionType: number): string => {
  switch (emotionType) {
    case 1:
      return 'themeHappy';
    case 2:
      return 'themeSad';
    case 3:
      return 'themeAngry';
    case 4:
      return 'themeUpset';
    case 5:
      return 'themeSimsim';
    case 6:
      return 'themeTired';
    default:
      return 'themeHappy';
  }
};
