import dayjs, { Dayjs } from 'dayjs';
import { useDispatch } from 'react-redux';
import {
  setSelectedDay,
  setShowEventModal,
} from '../../store/slices/calendarSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { CalendarEvent } from '../../models/event';
import { setSelectedEvent } from '../../store/slices/eventSlice';
import getISOFormatString from '../../utils/get-iso-format-string';

interface Props {
  day: Dayjs;
  rowIndex: number;
}

const Day = ({ day, rowIndex }: Props) => {
  const dispatch = useDispatch();
  const [dayEvents, setDayEvents] = useState<CalendarEvent[]>([]);
  const storedEvents = useSelector(
    (state: RootState) => state.eventSlice.events
  );

  useEffect(() => {
    const currDay = day.format(getISOFormatString());
    const currDayEvents = storedEvents.filter(
      (event) => event.date === currDay
    );
    setDayEvents(currDayEvents);
  }, [storedEvents, day]);

  function getCurrentDay(): string {
    return day.format(getISOFormatString()) ===
      dayjs().format(getISOFormatString())
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  }

  function selectEventHandler(
    event: CalendarEvent,
    mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    mouseEvent.stopPropagation();
    dispatch(setSelectedEvent(event));
    dispatch(setShowEventModal(true));
  }

  function openSelectedDayEventModal(): void {
    dispatch(setSelectedDay(day.format(getISOFormatString())));
    dispatch(setShowEventModal(true));
  }

  return (
    <div
      className='border border-gray-200 flex flex-col cursor-pointer'
      onClick={() => openSelectedDayEventModal()}
    >
      <header className='flex flex-col items-center'>
        {rowIndex === 0 && (
          <p className='text-sm mt-1'>{day.format('ddd').toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDay()}`}>
          {day.format('DD')}
        </p>
      </header>
      <div className='flex-1 cursor-pointer'>
        {dayEvents.map((event: CalendarEvent) => {
          return (
            <div
              key={event.id}
              onClick={(mouseEvent) => selectEventHandler(event, mouseEvent)}
              className='bg-blue-200 p-1 text-gray-600 text-sm rounded mb-1 truncate hover:bg-blue-300'
            >
              {event.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Day;
