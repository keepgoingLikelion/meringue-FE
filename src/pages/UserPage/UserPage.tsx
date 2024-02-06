/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import './UserPage.css';
import { format } from 'date-fns';
import MenuBar from '../../components/Menu/Menu';
import styles from '../../styles/Layout.module.css';
import profileIcon from '../../assets/basic-logo-lined.svg';
import Calendar from '../../components/Calendar/Container';
import { useCalendarStore } from '../../actions/calendarStore';
import EmotionList from '../../components/EmotionList/EmotionList';

function Mypage() {
  const { currentDate } = useCalendarStore();
  const [todayDate, setTodayDate] = useState(new Date());
  useEffect(() => {
    setTodayDate(new Date());
  }, [currentDate]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <MenuBar />
      </div>
      <div className={styles.container}>
        <div className="profileContainer">
          <div className="profileContent">
            <h2 className="userName">내이름은홍길동</h2>
            <h4 className="userMood">오늘의 쿠키: 오예</h4>
          </div>
          <img
            src={profileIcon}
            alt="userIcon"
            className="userIcon"
          />
        </div>
        <div className={styles.contentWrapper}>
          <div className="calContainer">
            <Calendar />
          </div>
          <div className="todayCardContainer">
            <h4 className="todayDate">
              {format(todayDate, 'yyyy년 MM월 dd일')}
            </h4>
            <div className="cardContent">
              <h5>오늘 날짜 카드 컴포넌트가 이곳에 표시됨 </h5>
            </div>
          </div>
          <div className="userLogContainer">
            <EmotionList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
