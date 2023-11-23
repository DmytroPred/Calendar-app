import dayjs, { Dayjs } from 'dayjs';
import { useDispatch } from 'react-redux';
import {
  setSelectedDay,
  setShowEventModal,
} from '../../store/slices/calendarSlice';

interface Props {
  day: Dayjs;
  rowIndex: number;
}

const Day = ({ day, rowIndex }: Props) => {
  const dispatch = useDispatch();

  function getCurrentDay(): string {
    return day.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  }

  return (
    <div
      className='border border-gray-200 flex flex-col cursor-pointer'
      onClick={() => {
        dispatch(setSelectedDay(day.format('YYYY-MM-DD')));
        dispatch(setShowEventModal(true));
      }}
    >
      <header className='flex flex-col items-center'>
        {rowIndex === 0 && (
          <p className='text-sm mt-1'>{day.format('ddd').toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDay()}`}>
          {day.format('DD')}
        </p>
      </header>
    </div>
  );
};

export default Day;
