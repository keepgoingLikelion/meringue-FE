/* eslint-disable import/prefer-default-export */
import create from 'zustand';
// eslint-disable-next-line import/no-extraneous-dependencies
import { subMonths, addMonths, getDaysInMonth } from 'date-fns';

type CalendarStore = {
  currentDate: Date;
  weekCalendarList: number[][];
  setCurrentDate: (date: Date) => void;
  updateMonth: (action: 'prev' | 'next') => void;
};

export const useCalendarStore = create<CalendarStore>((set) => {
  const today = new Date();

  const initializeCalendar = (date: Date) => {
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

    set({ currentDate: date, weekCalendarList });
  };

  initializeCalendar(today);

  return {
    currentDate: today,
    weekCalendarList: [],
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
