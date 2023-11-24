import { useEffect, useState } from 'react';
import CalendarHeader from '../components/ui/CalendarHeader';
import Month from '../components/ui/Month';
import getMonth from '../utils/get-month';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { Dayjs } from 'dayjs';
import Sidebar from '../components/ui/Sidebar';
import EventModal from '../components/ui/EventModal';
import { useDispatch } from 'react-redux';
import { fetchEvents } from '../store/slices/eventSlice';

function Calendar() {
  const dispatch = useDispatch<AppDispatch>();
  const [currentMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());
  const user = useSelector((state: RootState) => state.authReducer.user);
  const monthNumber = useSelector(
    (state: RootState) => state.calendarReducer.monthNumber
  );
  const showEventModal = useSelector(
    (state: RootState) => state.calendarReducer.showEventModal
  );

  useEffect(() => {
    if (!user) return;

    dispatch(fetchEvents(user?.uid));
  }, [user, dispatch]);

  useEffect(() => {
    setCurrentMonth(getMonth(monthNumber));
  }, [monthNumber]);

  return (
    <>
      {showEventModal && <EventModal />}
      <div className='h-[calc(100vh-80px)] flex flex-col'>
        <CalendarHeader />
        <div className='flex flex-1'>
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </>
  );
}

export default Calendar;
