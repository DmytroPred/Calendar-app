import { Dayjs } from 'dayjs';
import { Fragment } from 'react';

interface Props {
  currentMonth: Dayjs[][];
  daySelectHandler: (day: Dayjs) => void;
  getCurrentDayClass: (day: Dayjs) => string;
}

const SmallCalendarMonth = ({
  currentMonth,
  daySelectHandler,
  getCurrentDayClass,
}: Props) => {
  return (
    <>
      {currentMonth.map((row, rowIndex) => {
        return (
          <Fragment key={rowIndex}>
            {row.map((day) => {
              return (
                <button
                  onClick={() => daySelectHandler(day)}
                  key={day.unix()}
                  className={`rounded-full py-1 w-8 ${getCurrentDayClass(
                    day
                  )}hover:bg-gray-200`}
                >
                  <span className='text-sm'>{day.format('D')}</span>
                </button>
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
};

export default SmallCalendarMonth;
