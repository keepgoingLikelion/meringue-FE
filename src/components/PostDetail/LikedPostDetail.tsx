/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

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

function LikedPostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get<Post[]>(`http://localhost:3000/myLikedPostList?postId=${postId}`); // 임의 api
        setPost(res.data[0]);
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
      <p>{post.postId}</p>
      <p>{format(post.createdDate, 'yyyy-MM-dd')}</p>
      <p>{post.content}</p>
      <p>
        {post.comments.map((comment, idx) => (
          <div key={idx}>
            <h4>comment ID:</h4>
            <p>{comment.commentId}</p>
          </div>
        ))}
      </p>
    </div>
  );
}

export default LikedPostDetail;
