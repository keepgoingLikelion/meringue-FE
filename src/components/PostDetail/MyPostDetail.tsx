/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LuLoader } from 'react-icons/lu';
import s from './PostDetail.module.css';
import PostView from '../PostView/PostView.tsx';
import instance from '../../interface/instance';
import { PostData } from '../../interface/emojiInterface';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState<PostData | null>(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const api = `post/${postId}`;
        const res: { data: PostData } = await instance.get(api);
        setPost(res.data);
      } catch (error) {
        console.error('Error fetching myPostDetail:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return (
      <div className={s.wrapper}>
        <LuLoader style={{ color: 'lightgrey', width: '30px', height: '30px' }} />
        ;
      </div>
    );
  }

  return (
    <PostView postId={parseInt(postId!, 10)} stickers={post.emojis} content={post.content} type={post.emotionType} />
  );
}

export default PostDetail;
