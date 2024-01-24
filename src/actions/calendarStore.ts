/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */
// import axios from 'axios';
import {
  subMonths, addMonths, getDaysInMonth,
} from 'date-fns';
import create from 'zustand';

// const fetchPostDates = async (month: Date) => {
//   const res = await axios.get(`/api/posts?month=${format(month, 'yyyy-MM')}`);
//   return res.data;
// };
// const fetchPostCategories = async (date: Date) => {
//   // const res = await axios.get(`/api/posts/categories?date=${format(date, 'yyyy-MM-dd')}`);
//   // return res.data;
//   return ['Category1', 'Category2'];
// };
const fetchPostDates = async () => ['2024-01-01', '2024-01-25', '2024-02-15'];
const fetchPostCategories = async (date: Date) => ['Category1'];

type CalendarStore = {
  currentDate: Date;
  weekCalendarList: number[][];
  posting: string[];
  postCategories: string[];
  setCurrentDate: (date: Date) => void;
  updateMonth: (action: 'prev' | 'next') => void;
};

export const useCalendarStore = create<CalendarStore>((set) => {
  const today = new Date();

  // const { data: postDates } = useQuery(['postDates', today], () => fetchPostDates(today));

  const initializeCalendar = async (date: Date) => {
    const postDates = await fetchPostDates();
    const postCategories = await fetchPostCategories(date);
    const totalMonthDays = getDaysInMonth(date);
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const prevDayList = Array.from({
      length: firstDayOfMonth.getDay(),
    }).map(() => 0);

    const currentDayList = Array.from({ length: totalMonthDays }).map((_, i) => i + 1);

    const nextDayList = Array.from({
      length: 6 - lastDayOfMonth.getDay(),
    }).map(() => 0);

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
      posting: postDates || [],
      postCategories: postCategories || [],
    });
  };

  initializeCalendar(today);

  return {
    currentDate: today,
    weekCalendarList: [],
    posting: [],
    postCategories: [],
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
