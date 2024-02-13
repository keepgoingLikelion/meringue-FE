/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import { useTodayPostStore } from '../../actions/todayPost';
import s from './PostDetail.module.css';
import getThemeColor from '../../utils/getThemeColor';
import theme from '../../styles/ThemeColor.module.css';

function TodayPostDetail() {
  const { todayPost, fetchTodayPost } = useTodayPostStore();
  useEffect(() => {
    fetchTodayPost();
  }, [fetchTodayPost]);

  if (!todayPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${s.wrapper} ${theme[getThemeColor(todayPost.emotionType)]}`}>
      <div className={s.card}>
        <h4>{todayPost.content}</h4>
      </div>
      {/* <p>
        {post.comments.map((comment, idx) => (
          <div key={idx}>
            <h4>comment ID:</h4>
            <p>{comment.commentId}</p>
          </div>
        ))}
      </p> */}
    </div>
  );
}

export default TodayPostDetail;
