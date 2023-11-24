import dayjs, { Dayjs } from 'dayjs';
import { Fragment, useEffect, useState } from 'react';
import getMonth from '../../utils/get-month';
import ChevronButton from './ChevronButton';
import formaCalendarDate from '../../utils/format-calendar-date';
import { useDispatch } from 'react-redux';
import {
  setMonthNumber,
  setSelectedDay,
} from '../../store/slices/calendarSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import getISOFormatString from '../../utils/get-iso-format-string';

const SmallCalendar = () => {
  const dispatch = useDispatch();
  const selectedDay = useSelector(
    (state: RootState) => state.calendarReducer.selectedDay
  );
  const monthNumber = useSelector(
    (state: RootState) => state.calendarReducer.monthNumber
  );
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonthIndex(monthNumber);
  }, [monthNumber]);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  function handlePrevMonth(): void {
    setCurrentMonthIndex(currentMonthIndex - 1);
  }

  function handleNextMonth(): void {
    setCurrentMonthIndex(currentMonthIndex + 1);
  }

  function getCurrentDayClass(day: Dayjs): string {
    const format = getISOFormatString();
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);

    if (nowDay === currDay) {
      return 'bg-blue-500 text-white hover:bg-blue-500';
    } else if (selectedDay === currDay) {
      return 'bg-blue-100 text-blue-600 font-bold hover:bg-blue-200 hover:text-black';
    }

    return '';
  }

  function daySelectHandler(day: Dayjs) {
    dispatch(setMonthNumber(currentMonthIndex));
    dispatch(setSelectedDay(day.format(getISOFormatString())));
  }

  return (
    <div className='mt-9'>
      <header className='flex justify-between mb-2'>
        <p className='text-gray-500 font-bold'>
          {formaCalendarDate(currentMonthIndex)}
        </p>

        <div className='flex'>
          <ChevronButton handler={handlePrevMonth} direction='left' />
          <ChevronButton handler={handleNextMonth} direction='right' />
        </div>
      </header>

      <div className='grid grid-cols-7 grid-rows-6'>
        {currentMonth[0].map((day) => {
          const dayChars = day.format('dd');

          return (
            <span key={dayChars} className='text-sm py-1 text-center'>
              {dayChars}
            </span>
          );
        })}

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
      </div>
    </div>
  );
};

export default SmallCalendar;
