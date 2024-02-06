import { Link, useParams } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import PostList from '../../components/LikedPostsList/PostList';
import s from './UserLog.module.css';
import MenuBar from '../../components/Menu/Menu';

function UserLog() {
  const { emotionType } = useParams();
  const selectedEmotion = emotionType ? parseInt(emotionType, 10) : 0;

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <MenuBar />
      </div>
      <div className={s.container}>
        <div className={s.topWrapper}>
          <div className={s.buttons}>
            <Link to="/mypage" className={s.buttons}>
              <AiOutlineClose className={s.button} />
            </Link>
          </div>
          <h2>그땐 머랭?</h2>
        </div>
        <div className={s.postContainer}>
          <PostList emotionType={selectedEmotion} />
        </div>
      </div>
    </div>
  );
}

export default UserLog;
