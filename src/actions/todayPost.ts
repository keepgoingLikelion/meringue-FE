/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import { create } from 'zustand';
import { AxiosResponse } from 'axios';
import instance, { APIResponse } from '../interface/instance';
import { PostData } from '../interface/emojiInterface';

type TodayPostStore = {
  todayPost: PostData | null;
  fetchTodayPost: () => Promise<void>;
};

export const useTodayPostStore = create<TodayPostStore>((set) => ({
  todayPost: null,
  fetchTodayPost: async () => {
    try {
      const res: AxiosResponse<APIResponse<PostData>> = await instance.get('/post/myPost');
      set({ todayPost: res.data.data });
    } catch (error) {
      console.error('Error fetching today post:', error);
    }
  },
}));
