import { useNavigate } from 'react-router-dom';
import styles from './UserTextCard.module.css';
import { PostSDTO } from '../../interface/postInterface.ts';
import Happy from '../../assets/moodIcons/happy.svg';
import { getCategoryImg } from '../../functions/getCategory.ts';

export default function UserTextCard({ data }: { data: PostSDTO }) {
  const navigation = useNavigate();
  const onClickCard = () => {
    navigation(`/post/${data.postId}`);
  };
  return (
    <div className={styles.wrap} onClick={onClickCard}>
      <div className={styles.profile}>
        <div className={styles.userInfo}>
          <img width="32px" height="32px" src={getCategoryImg(data.emotionType) ?? Happy} alt="happy" />
          <div>
            <p className={styles.username}>{data.username}</p>
            <p className={styles.postdate}>{data.createdDate}</p>
          </div>
        </div>
        <div className={styles.commentCount}>
          <div style={{ color: 'red', display: 'inline' }}>❤</div>
          {' '}
          {data.emojiCount}
        </div>
      </div>
      <div className={styles.content}>
        {data.content}
      </div>
    </div>
  );
}
