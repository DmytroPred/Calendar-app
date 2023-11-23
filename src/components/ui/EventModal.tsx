import { useDispatch, useSelector } from 'react-redux';
import { setShowEventModal } from '../../store/slices/calendarSlice';
import { useForm } from 'react-hook-form';
import { RootState } from '../../store/store';
import formatEventModalDate from '../../utils/format-event-date';

interface Inputs {
  title: string;
  description: string;
}

const EventModal = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<Inputs>();
  const selectedDay = useSelector((state: RootState) =>
    formatEventModalDate(state.calendarReducer.selectedDay)
  );

  function onSubmit() {}

  function onClose(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    dispatch(setShowEventModal(false));
  }

  return (
    <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
      <form
        className='bg-white rounded-lg shadow-2xl md:w-1/2 lg:w-1/4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <header className='bg-gray px-4 py-2 flex justify-between items-center'>
          <p className='text-sm'>{selectedDay}</p>
          <button onClick={(event) => onClose(event)}>
            <span className='material-icons text-gray-400'>close</span>
          </button>
        </header>

        <div className='p-3 flex flex-col gap-3'>
          <input
            className='text-input w-full'
            type='text'
            name='title'
            placeholder='Add title'
            {...(register('title'), { required: true })}
          />

          <input
            className='text-input w-full'
            type='text'
            name='description'
            placeholder='Add description'
            {...(register('description'), { required: true })}
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
