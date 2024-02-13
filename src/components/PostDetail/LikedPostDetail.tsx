/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import instance, { APIResponse } from '../../interface/instance';
import { PostData } from '../../interface/emojiInterface';
import PostView from '../PostView/PostView';

function LikedPostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState<PostData | null>(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const api = `post/${postId}`;
        const res: AxiosResponse<APIResponse<PostData>> = await instance.get(api);
        setPost(res.data.data);
      } catch (error) {
        console.error('Error fetching LikedPostDetail:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <PostView stickers={post.emoji} content={post.content} type={post.emotionType} />
  );
}

export default LikedPostDetail;
