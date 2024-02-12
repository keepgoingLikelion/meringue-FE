/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { LuLoader } from 'react-icons/lu';
import s from './PostDetail.module.css';
import getThemeColor from '../../utils/getThemeColor';
import theme from '../../styles/ThemeColor.module.css';

interface Post {
  postId: number;
  createdDate: Date;
  username: string;
  emotionType: number;
  content: string;
  comments: Comment[];
}

interface Comment {
  commentId: number;
  userId: number;
  emojiImgUrl: string;
  pointX: number;
  pointY: number;
}

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get<Post[]>(`http://localhost:3000/post?postId=${postId}`); // 임의 api
        setPost(res.data[0]);
      } catch (error) {
        console.error('Error fetching post:', error);
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
