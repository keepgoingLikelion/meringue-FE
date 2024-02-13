/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { LuLoader } from 'react-icons/lu';
import s from './PostDetail.module.css';
import getThemeColor from '../../utils/getThemeColor';
import theme from '../../styles/ThemeColor.module.css';
import instance, { APIResponse } from '../../interface/instance';

interface PostDTO {
  postId: number;
  createdDate: string;
  username: string;
  emotionType: number;
  content: string;
  emojis: EmojiDTO[];
}
interface EmojiDTO {
  emojiId: number;
  emojiImgUrl: string;
  pointX: number;
  pointY: number;
}

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState<PostDTO | null>(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const api = `post/${postId}`;
        const res: AxiosResponse<APIResponse<PostDTO>> = await instance.get(api);
        setPost(res.data.data);
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
    <div className={`${s.wrapper} ${theme[getThemeColor(post.emotionType)]}`}>
      <div className={s.card}>
        <h4>{post.content}</h4>
      </div>
    </div>
  );
}

export default PostDetail;
