/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import { useTodayPostStore } from '../../actions/todayPost';
import PostView from '../PostView/PostView';

function TodayPostDetail() {
  const { todayPost, fetchTodayPost } = useTodayPostStore();
  useEffect(() => {
    fetchTodayPost();
  }, [fetchTodayPost]);

  if (!todayPost) {
    return <div>Loading...</div>;
  }

  return (
    <PostView
      stickers={todayPost.emojis}
      content={todayPost.content}
      type={todayPost.emotionType}
    />
  );
}

export default TodayPostDetail;
