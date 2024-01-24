/* eslint-disable react/no-array-index-key */

// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from 'date-fns';
import { useCalendarStore } from '../../actions/calendarStore';
import s from '../../styles/Calendar.module.css';

// ... (other imports)

function CalBody() {
  const { currentDate, weekCalendarList } = useCalendarStore();
  const handleDateClick = (clickedDate: Date) => {
    console.log(`Clicked on ${format(clickedDate, 'yyyy-MM-dd')}`);
  };

  return (
    <div className={s.bodyWrapper}>
      {weekCalendarList.map((item, weekIndex) => (
        <div className={s.weeks} key={weekIndex}>
          {item.map((day, dayIndex) => (
            <button
              type="button"
              className={`${s.days}`}
              style={day === 0 ? { visibility: 'hidden' } : {}}
              onClick={() => {
                const clickedDate = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day,
                );
                handleDateClick(clickedDate);
              }}
              key={dayIndex}
            >
              <div className="days">{day}</div>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
// ... (other code)

export default CalBody;
