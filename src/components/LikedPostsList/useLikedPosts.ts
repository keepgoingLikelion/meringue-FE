/* eslint-disable import/no-extraneous-dependencies */
import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import useLikedPostsStore from '../../actions/likedPostsStore';
import instance, { APIResponse } from '../../interface/instance';
import { PostSimpleDTO } from '../../interface/postInterface.ts';

const fetchLikedPosts = async (emotionType: number) => {
  try {
    const res: AxiosResponse<APIResponse<PostSimpleDTO[]>> = await instance.get('/post/myLikePostList', {
      params: { emotionType },
    });
    return res.data.data as PostSimpleDTO[];
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
