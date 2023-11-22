import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setMonthNumber } from '../../store/calendar/calendarSlice';
import dayjs from 'dayjs';

const CalendarHeader = () => {
  const dispatch = useDispatch();
  const monthNumber = useSelector(
    (state: RootState) => state.calendarReducer.monthNumber
  );

  function handleNextMonth(): void {
    dispatch(setMonthNumber(monthNumber + 1));
  }

  function handlePrevMonth(): void {
    dispatch(setMonthNumber(monthNumber - 1));
  }

  function handleReset(): void {
    dispatch(setMonthNumber(dayjs().month()));
  }

  return (
    <header className='px-2 py-2 flex items-center sm:px-4'>
      <img
        src='./icons/google_calendar.svg'
        alt='calendar'
        className='mr-2 sm:w-12 sm:h-12 h-8 w-8'
      />
      <h1 className='mr-10 text-xl text-gray-500 font-bold hidden sm:block'>
        Calendar
      </h1>
      <button
        className='border rounded py-2 px-2 mr-1 sm:px-5 sm:mr-5'
        onClick={handleReset}
      >
        Today
      </button>
      <button className='flex items-center' onClick={handlePrevMonth}>
        <span className='material-icons cursor-pointer text-gray-600 mx-2'>
          chevron_left
        </span>
      </button>
      <button className='flex items-center' onClick={handleNextMonth}>
        <span className='material-icons cursor-pointer text-gray-600 mx-2'>
          chevron_right
        </span>
      </button>

      <h2 className='ml-1 text-sm text-gray-500 font-bold sm:ml-4 sm:text-xl'>
        {dayjs(new Date(dayjs().year(), monthNumber)).format('MMMM YYYY')}
      </h2>
    </header>
  );
};

export default CalendarHeader;
