/* eslint-disable import/no-extraneous-dependencies */
import { useQuery } from 'react-query';
import useLikedPostsStore from '../../actions/likedPostsStore';
import instance from '../../interface/instance';
import { PostSimpleDTO, PostsDTO } from '../../interface/postInterface.ts';

const fetchLikedPosts = async (emotionType: number) => {
  try {
    const res: { data: PostsDTO } = await instance.get('/post/myLikePostList', {
      params: { emotionType },
    });
    return res.data.posts;
  } catch (error) {
    console.log('Error fetching LikedPosts: ', error);
    throw error;
  }
};

const useLikedPosts = (emotionType: number) => {
  const setLikedPosts = useLikedPostsStore((state) => state.setLikedPosts);

  const { data: likedPosts } = useQuery<PostSimpleDTO[]>(['likedPosts', emotionType], () => fetchLikedPosts(emotionType), {
    onSuccess: (data) => {
      setLikedPosts(data);
    },
  });

  return { likedPosts };
};

export default useLikedPosts;
