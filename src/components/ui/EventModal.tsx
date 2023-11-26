import { useDispatch, useSelector } from 'react-redux';
import { setShowEventModal } from '../../store/slices/calendarSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppDispatch, RootState } from '../../store/store';
import formatEventModalDate from '../../utils/format-event-date';
import { CalendarEvent } from '../../models/event';
import { v4 as uuidv4 } from 'uuid';
import {
  addEvent,
  deleteEvent,
  setSelectedEvent,
  updateEvent,
} from '../../store/slices/eventSlice';
import { useEffect } from 'react';

interface Inputs {
  title: string;
  description: string;
  time: string;
}

const EventModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      time: '00:00',
    },
  });
  const selectedDay = useSelector(
    (state: RootState) => state.calendarReducer.selectedDay
  );
  const selectedEvent = useSelector(
    (state: RootState) => state.eventSlice.selectedEvent
  );
  const user = useSelector((state: RootState) => state.authReducer.user);

  useEffect(() => {
    if (selectedEvent) {
      setValue('description', selectedEvent.description);
      setValue('title', selectedEvent.title);
      setValue('time', selectedEvent.time);
    }
  }, [selectedEvent, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (
    data: Inputs
  ): Promise<void> => {
    if (!user || !selectedDay) return;

    const id = selectedEvent ? selectedEvent.id : uuidv4();
    const event: CalendarEvent = {
      ...data,
      date: selectedEvent ? selectedEvent.date : selectedDay,
      id,
    };

    if (selectedEvent) {
      dispatch(updateEvent({ userId: user.uid, event })).then(() =>
        closeModal()
      );
      return;
    }

    dispatch(addEvent({ userId: user.uid, event })).then(() => closeModal());
  };

  function onClose(
    mouseEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    mouseEvent.preventDefault();
    closeModal();
  }

  function onDelete(): void {
    if (!user || !selectedEvent) return;

    dispatch(deleteEvent({ userId: user.uid, event: selectedEvent })).then(
      () => {
        closeModal();
      }
    );
  }

  function closeModal(): void {
    dispatch(setShowEventModal(false));
    dispatch(setSelectedEvent(null));
  }

  const deleteEventButton = (
    <button onClick={() => onDelete()}>
      <span className='material-icons text-gray-400 mr-2 bg-rounded-gray-hover'>
        delete
      </span>
    </button>
  );

  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50'>
      <form
        className='bg-white rounded-lg shadow-2xl md:w-1/2 lg:w-1/4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <header className='bg-gray px-4 py-2 flex justify-between items-center'>
          <p className='text-sm'>{formatEventModalDate(selectedDay)}</p>

          <div>
            {selectedEvent && deleteEventButton}
            <button onClick={(event) => onClose(event)}>
              <span className='material-icons text-gray-400 bg-rounded-gray-hover'>
                close
              </span>
            </button>
          </div>
        </header>

        <div className='p-3 flex flex-col gap-3'>
          <input
            className='text-input w-full'
            type='text'
            placeholder='Add title'
            required
            {...register('title')}
          />

          <textarea
            className='text-input !rounded-xl !py-4 w-full'
            maxLength={200}
            placeholder='Add description'
            {...register('description')}
          />

          <input
            className='text-input w-full'
            type='time'
            required
            {...register('time')}
          />

          <button type='submit' className='submit-button'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventModal;
