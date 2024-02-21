import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../interface/instance';
import { PostData } from '../../interface/emojiInterface';
import PostView from '../PostView/PostView';

function LikedPostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState<PostData | null>(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const api = `post/${postId}`;
        const res: { data: PostData } = await instance.get(api);
        setPost(res.data);
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
    <PostView postId={parseInt(postId!, 10)} stickers={post.emojis} content={post.content} type={post.emotionType} />
  );
}

export default LikedPostDetail;
