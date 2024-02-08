import styles from './UserTextCard.module.css';
import { PostSimpleDTO } from '../../interface/postInterface.ts';
import Happy from '../../assets/moodIcons/happy.svg';

const getDateToString = (date: Date) => {
  date = new Date(date.toString());
  const m = date.getMonth();
  const d = date.getDate();
  return `${date.getFullYear()}.${m >= 10 ? m : `0${m}`}.${d >= 10 ? d : `0${d}`}`;
};

export default function UserTextCard({ data }: { data: PostSimpleDTO }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.profile}>
        <div className={styles.userInfo}>
          <img width="32px" height="32px" src={Happy} alt="happy" />
          <div>
            <p className={styles.username}>{data.username}</p>
            <p className={styles.postdate}>{getDateToString(data.createdDate)}</p>
          </div>
        </div>
        <div className={styles.commentCount}>
          23+
        </div>
      </div>
      <div className={styles.content}>
        {data.content}
      </div>
    </div>
  );
}
