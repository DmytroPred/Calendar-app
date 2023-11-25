import { useDispatch } from 'react-redux';
import { setShowEventModal } from '../../store/slices/calendarSlice';

const CreateEventButton = () => {
  const dispatch = useDispatch();

  return (
    <button
      className='border p-2 rounded-full flex items-center shadow-md hover:shadow-xl'
      onClick={() => dispatch(setShowEventModal(true))}
    >
      <img src='/icons/plus.svg' alt='plus' className='w-7 h-7' />
      <span className='pl-3 pr-7'> Create</span>
    </button>
  );
};

export default CreateEventButton;
