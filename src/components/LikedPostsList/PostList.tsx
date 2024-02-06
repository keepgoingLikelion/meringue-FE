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
            <Card
              key={post.postId}
              createdDate={post.createdDate}
              username={post.username}
              content={post.content}
              emotionType={post.emotionType}
              // comments={post.comment}
            />
          ))}
        </div>
      ) : (
        <p>펑</p>
      )}
    </div>
  );
}

export default PostList;
