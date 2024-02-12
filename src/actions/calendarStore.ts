/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import {
  subMonths, addMonths, getDaysInMonth, format,
} from 'date-fns';
import create from 'zustand';

interface PostDTO {
  postId: number;
  createdDate: Date;
  username: string;
  emotionType: number;
  content: string;
  comments: CommentDTO[];
}

interface CommentDTO {
  commentId: number;
  userId: number;
  emojiImgUrl: String;
  pointX: number;
  pointY: number;
}

type CalendarStore = {
  currentDate: Date;
  weekCalendarList: number[][];
  posts: PostDTO[];
  setCurrentDate: (date: Date) => void;
  updateMonth: (action: 'prev' | 'next') => void;
};

export const useCalendarStore = create<CalendarStore>((set) => {
  const today = new Date();

  const fetchPostsForMonth = async (date: Date): Promise<PostDTO[]> => {
    try {
      const api = `http://localhost:3000/post?year=${date.getFullYear()}&month=${date.getMonth() + 1}`;
      const response = await axios.get(api);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  };

  const initializeCalendar = async (date: Date) => {
    const posts = await fetchPostsForMonth(date);
    const totalMonthDays = getDaysInMonth(date);
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // 수정
    const prevDayList = Array(firstDayOfMonth.getDay()).fill(0);
    const currentDayList = Array.from({ length: totalMonthDays }).map((_, i) => i + 1);
    const nextDayList = Array(6 - lastDayOfMonth.getDay()).fill(0);

    const weekCalendarList = [...prevDayList, ...currentDayList, ...nextDayList].reduce(
      (acc: number[][], cur, idx) => {
        const chunkIndex = Math.floor(idx / 7);
        if (!acc[chunkIndex]) {
          acc[chunkIndex] = [];
        }
        acc[chunkIndex].push(cur);
        return acc;
      },
      [],
    );

    set({
      currentDate: date,
      weekCalendarList,
      posts,
    });
  };

  initializeCalendar(today);

  return {
    currentDate: today,
    weekCalendarList: [],
    posts: [],
    setCurrentDate: (date) => initializeCalendar(date),
    updateMonth: (action) => {
      set((state) => {
        const newDate = action === 'prev' ? subMonths(state.currentDate, 1) : addMonths(state.currentDate, 1);
        initializeCalendar(newDate);
        return { currentDate: newDate };
      });
    },
  };
});
