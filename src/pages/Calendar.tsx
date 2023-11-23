import { useEffect, useState } from 'react';
import CalendarHeader from '../components/ui/CalendarHeader';
import Month from '../components/ui/Month';
import getMonth from '../utils/get-month';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Dayjs } from 'dayjs';
import Sidebar from '../components/ui/Sidebar';
import EventModal from '../components/ui/EventModal';

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState<Dayjs[][]>(getMonth());
  const monthNumber = useSelector(
    (state: RootState) => state.calendarReducer.monthNumber
  );
  const showEventModal = useSelector(
    (state: RootState) => state.calendarReducer.showEventModal
  );

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
