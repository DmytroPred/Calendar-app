import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import EventList from '../components/ui/EventList';
import { useDispatch } from 'react-redux';
import {
  fetchEventByDate,
  setDisplayedEvents,
} from '../store/slices/eventSlice';
import BackButton from '../components/ui/BackButton';

const DayEvents = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { date } = useParams();
  const storedEvents = useSelector(
    (state: RootState) => state.eventSlice.events
  );
  const displayedEvents = useSelector(
    (state: RootState) => state.eventSlice.displayedEvents
  );
  const user = useSelector((state: RootState) => state.authReducer.user);

  useEffect(() => {
    if (storedEvents.length) {
      const currDayEvents = storedEvents.filter((event) => event.date === date);
      dispatch(setDisplayedEvents(currDayEvents));
    }

    if (!storedEvents.length && !displayedEvents && user && date) {
      dispatch(fetchEventByDate({ userId: user.uid, date }));
    }
  }, [dispatch, date, user, storedEvents]);

  return (
    <div className='mt-6 mb-12 w-11/12 h-11/12 mx-auto'>
      <div className='flex items-center mb-5 gap-3'>
        <BackButton />
        {displayedEvents?.length && <h2 className='text-2xl'>{date}</h2>}
      </div>
      <div className='grid auto-rows-fr md:grid-cols-3 gap-8'>
        {displayedEvents?.length ? (
          <EventList eventList={displayedEvents} />
        ) : (
          `There is no events for ${date}`
        )}
      </div>
    </div>
  );
};

export default DayEvents;
