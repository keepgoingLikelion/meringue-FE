import { create } from 'zustand';
import instance from '../interface/instance';
import { PostData } from '../interface/emojiInterface';

type TodayPostStore = {
  todayPost: PostData | null;
  fetchTodayPost: () => Promise<void>;
};

export const useTodayPostStore = create<TodayPostStore>((set) => ({
  todayPost: null,
  fetchTodayPost: async () => {
    try {
      const res: { data: PostData } = await instance.get('/post/myPost');
      set({ todayPost: res.data });
    } catch (error) {
      console.error('Error fetching today post:', error);
    }
  },
}));

export async function editContent(newContent: string, postId: number) {
  try {
    const response = await instance.put(`/post/${postId}`, { newContent });
    if (response.status === 200) {
      // return response.data;
      console.log('Content edited successfully');
    } else {
      console.error('Failed to edit post');
    }
  } catch (error) {
    console.error('Error editing content:', error);
  }
}