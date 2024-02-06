/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
        const response = await axios.get<Post>(`http://localhost:3000/post/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetail;
