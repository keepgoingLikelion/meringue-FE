import styles from './UserTextCard.module.css';
import { PostSimpleDTO } from '../../interface/postInterface.ts';
import Happy from '../../assets/moodIcons/happy.svg';
import { getCategoryImg } from '../../functions/getCategory.ts';

const getDateToString = (date: Date) => {
  const currentDate = new Date(date.toString());
  const m = currentDate.getMonth();
  const d = currentDate.getDate();
  return `${currentDate.getFullYear()}.${m >= 10 ? m : `0${m}`}.${d >= 10 ? d : `0${d}`}`;
};

export default function UserTextCard({ data }: { data: PostSimpleDTO }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.profile}>
        <div className={styles.userInfo}>
          <img width="32px" height="32px" src={getCategoryImg(data.emotionType) ?? Happy} alt="happy" />
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
