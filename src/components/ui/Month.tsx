import { Dayjs } from 'dayjs';
import { Fragment } from 'react';
import Day from './Day';

const Month = ({ month }: { month: Dayjs[][] }) => {
  return (
    <div className='flex-1 grid grid-cols-7 grid-rows-5'>
      {month.map((row, rowIndex) => {
        return (
          <Fragment key={rowIndex}>
            {row.map((day) => {
              return <Day day={day} rowIndex={rowIndex} key={day.unix()} />;
            })}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Month;
