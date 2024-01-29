/* eslint-disable react/no-array-index-key */
// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from 'date-fns';
import { useCalendarStore } from '../../actions/calendarStore';
import s from '../../styles/Calendar.module.css';
import happy from '../../assets/moodIcons/happy.svg';

function CalBody() {
  const { currentDate, weekCalendarList, posting } = useCalendarStore();

  const handleDateClick = (clickedDate: Date) => {
    const formattedDate = format(clickedDate, 'yyyy-MM-dd');
    console.log(`Clicked on ${formattedDate}`);
  };

  return (
    <div className={s.bodyWrapper}>
      {weekCalendarList.map((item, weekIndex) => (
        <div className={s.weeks} key={weekIndex}>
          {item.map((day, dayIndex) => {
            const clickedDate = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day,
            );

            return (
              <button
                type="button"
                className={`${s.days}`}
                style={day === 0 ? { visibility: 'hidden' } : {}}
                onClick={() => handleDateClick(clickedDate)}
                key={dayIndex}
              >
                <div className="days">
                  {posting.includes(format(clickedDate, 'yyyy-MM-dd')) ? (
                    <img src={happy} alt="Post" className={s.moodIcon} />
                  ) : (
                    day
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default CalBody;
