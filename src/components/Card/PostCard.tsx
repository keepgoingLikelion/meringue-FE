import { format } from 'date-fns';
import GetEmotionIcon from '../EmotionList/GetEmotionIcon';
import s from './PostCard.module.css';
import cream from '../../assets/creamLayer.svg';

interface CardProps {
  createdDate: Date,
  username: string,
  content: string,
  emotionType: number,
  // comments: number
}
function PostCard({
  createdDate,
  username,
  content,
  emotionType,
  // comments,
}: CardProps): JSX.Element {
  const postDate = format(createdDate, 'yyyy-MM-dd');

  return (
    <div className={s.wrapper}>
      <img
        src={cream}
        alt="cream"
        className={s.cream}
      />
      <div className={s.box}>
        <div className={s.top}>
          <div className={s.container}>
            <div className={s.profileIcon}>
              <GetEmotionIcon type={emotionType} />
            </div>
            <div className={s.profileDetail}>
              <h3>{username}</h3>
              <h5>{postDate}</h5>
            </div>
          </div>
        </div>
        <div className={s.content}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
