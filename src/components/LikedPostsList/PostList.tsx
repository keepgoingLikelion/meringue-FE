import { Link } from 'react-router-dom';
import useLikedPosts from './useLikedPosts';
import Card from '../Card/PostCard';

interface PostListProps {
  emotionType: number;
}

function PostList({ emotionType }: PostListProps): JSX.Element {
  const { likedPosts } = useLikedPosts(emotionType);

  return (
    <div>
      {likedPosts && likedPosts.length > 0 ? (
        <div className="postbox">
          {likedPosts.map((post: any) => (
            <Link key={post.postId} style={{ textDecorationLine: 'none', color: '#51372B' }} to={`/myLikedPost/${post.postId}`}>
              <Card
                key={post.postId}
                createdDate={post.createdDate}
                username={post.username}
                content={post.content}
                emotionType={post.emotionType}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h4 style={{ fontFamily: 'KyoBoHand', fontWeight: '300', color: 'grey' }}>두고 간 머랭쿠키가 없어요.</h4>
        </div>
      )}
    </div>
  );
}

export default PostList;
