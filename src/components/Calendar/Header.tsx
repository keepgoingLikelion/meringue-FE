/* eslint-disable import/no-extraneous-dependencies */
import { format } from 'date-fns';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { useCalendarStore } from '../../actions/calendarStore';
import s from '../../styles/Calendar.module.css';

function CalHeader() {
  const { currentDate, updateMonth } = useCalendarStore();

  return (
    <div className={s.calHeaderBar}>
      <CaretLeftOutlined className={s.buttonControl} type="button" onClick={() => updateMonth('prev')} />
      <div className={s.dateText}>
        <h4>
          {format(currentDate, 'yyyy-')}
          {format(currentDate, 'MM')}
        </h4>
      </div>
      <CaretRightOutlined className={s.buttonControl} type="button" onClick={() => updateMonth('next')} />
    </div>
  );
}

export default CalHeader;
