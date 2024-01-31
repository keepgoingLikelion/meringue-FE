import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import s from '../styles/EmotionList.module.css';
import useLikedPosts from '../actions/useLikedPosts';

const queryClient = new QueryClient();

function EmotionList() {
  const emotions = [1, 2, 3, 4, 5, 6];
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);

  const getEmotionIcon = (emotionType: number): string => {
    switch (emotionType) {
      case 1:
        return 'happy';
      case 2:
        return 'sad';
      case 3:
        return 'angry';
      case 4:
        return 'upset';
      case 5:
        return 'simsim';
      case 6:
        return 'tired';
      default:
        return '';
    }
  };

  const { data: likedPosts, isLoading } = useLikedPosts(selectedEmotion as number);

  const handleButtonClick = (emotionType: number) => {
    setSelectedEmotion(emotionType);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={s.wrapper}>
        {emotions.map((emotionType) => (
          <button
            type="button"
            key={emotionType}
            onClick={() => handleButtonClick(emotionType)}
            className={s.button}
          >
            <img
              src={`src/assets/moodIcons/${getEmotionIcon(emotionType)}.svg`}
              alt={`${getEmotionIcon(emotionType)}`}
              className={s.icons}
            />
          </button>
        ))}
      </div>

      {isLoading && <p>Loading...</p>}

      {likedPosts && (
        <div>
          <h2>User Liked Posts</h2>
          <div>
            {likedPosts.map((post: any) => (
              <div key={post.postId} className="card">
                <p>
                  {post.createdDate}
                </p>
                <p>
                  {post.username}
                </p>
                <p>
                  {post.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </QueryClientProvider>
  );
}

export default EmotionList;
