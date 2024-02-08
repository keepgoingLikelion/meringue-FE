/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { create } from 'zustand';

interface PostDTO {
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

type TodayPostStore = {
  todayPost: PostDTO | null;
  fetchTodayPost: () => Promise<void>;
};

export const useTodayPostStore = create<TodayPostStore>((set) => ({
  todayPost: null,
  fetchTodayPost: async () => {
    try {
      const res = await axios.get<PostDTO[]>('http://localhost:3000/myPost');
      set({ todayPost: res.data[0] });
    } catch (error) {
      console.error('Error fetching today post:', error);
    }
  },
}));
