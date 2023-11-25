import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { CalendarEvent } from '../models/event';

const CalendarEvents = () => {
  let { date } = useParams();
  const [dayEvents, setDayEvents] = useState<CalendarEvent[]>([]);
  const storedEvents = useSelector(
    (state: RootState) => state.eventSlice.events
  );

  useEffect(() => {
    const currDayEvents = storedEvents.filter((event) => event.date === date);
    setDayEvents(currDayEvents);
  }, [storedEvents, date]);

  const eventList = dayEvents.map((event) => {
    return (
      <div key={event.id}>
        <span>{event.description}</span>
      </div>
    );
  });
  return (
    <div>{dayEvents.length ? eventList : `There is no events for ${date}`}</div>
  );
};

export default CalendarEvents;
