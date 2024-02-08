/* eslint-disable react/no-array-index-key */
import { useEffect } from 'react';
import { format } from 'date-fns';
import { useTodayPostStore } from '../../actions/todayPost';

function TodayPostDetail() {
  const { todayPost, fetchTodayPost } = useTodayPostStore();
  useEffect(() => {
    fetchTodayPost();
  }, [fetchTodayPost]);

  if (!todayPost) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{todayPost.postId}</p>
      <p>{format(todayPost.createdDate, 'yyyy-MM-dd')}</p>
      <p>{todayPost.content}</p>
      <p>
        {todayPost.comments.map((comment, idx) => (
          <div key={idx}>
            <h4>comment ID:</h4>
            <p>{comment.commentId}</p>
          </div>
        ))}
      </p>
    </div>
  );
}

export default TodayPostDetail;
