/* eslint-disable import/no-extraneous-dependencies */
import { useQuery } from 'react-query';
import axios from 'axios';
import useLikedPostsStore from '../../actions/likedPostsStore';

interface PostSimpleDTO {
  postId: number;
  createdDate: Date;
  userId: number;
  username: string;
  emotionType: number;
  content: string;
}

const fetchLikedPosts = async (emotionType: number) => {
  const response = await axios.get('http://localhost:3000/myLikedPostList/', { params: { emotionType } });
  return response.data as PostSimpleDTO[];
};

const useLikedPosts = (emotionType: number) => {
  const setLikedPosts = useLikedPostsStore((state) => state.setLikedPosts);

  const { data: likedPosts } = useQuery(['likedPosts', emotionType], () => fetchLikedPosts(emotionType), {
    onSuccess: (data) => {
      setLikedPosts(data);
    },
  });

  return { likedPosts };
};

export default useLikedPosts;
