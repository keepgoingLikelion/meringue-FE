// import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Link } from 'react-router-dom';
import s from './EmotionList.module.css';
import GetEmotionIcon from '../../utils/GetEmotionIcon.tsx';
import useLikedPosts from '../LikedPostsList/useLikedPosts';

const queryClient = new QueryClient();

interface Props {
  emotionType: number;
}

function LikedPostCount({ emotionType }: Props): JSX.Element {
  const { likedPosts } = useLikedPosts(emotionType);

  return (
    <div className={s.likedPostCount}>
      <h5 className={s.count}>{likedPosts ? likedPosts.length : 0}</h5>
    </div>
  );
}

function EmotionList() {
  const emotions = [1, 2, 3, 4, 5, 6];

  return (
    <QueryClientProvider client={queryClient}>
      <div className={s.wrapper}>
        {emotions.map((emotionType) => (
          <Link to={`/myLog/${emotionType}`} key={emotionType} className={s.button}>
            <GetEmotionIcon type={emotionType} />
            <LikedPostCount emotionType={emotionType} />
          </Link>
        ))}
      </div>
    </QueryClientProvider>
  );
}

export default EmotionList;
