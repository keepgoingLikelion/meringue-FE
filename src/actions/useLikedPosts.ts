// 감정별로 likedPosts를 불러오는 react hook
import { useQuery } from 'react-query';

const fetchLikedPosts = async (emotionType: number) => {
  const response = await fetch(`/api/post/myLikePostList?emotionType=${emotionType}`);
  const data = await response.json();
  return data;
};

const useLikedPosts = (emotionType: number) => useQuery(['likedPosts', emotionType], () => fetchLikedPosts(emotionType), {
  enabled: emotionType !== null,
});

export default useLikedPosts;
