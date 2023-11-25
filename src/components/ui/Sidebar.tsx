import CreateEventButton from './CreateEventButton';
import SmallCalendar from './SmallCalendar';

const Sidebar = () => {
  return (
    <aside className='border p-4 w-64 sm:block hidden'>
      <CreateEventButton />
      <SmallCalendar />
    </aside>
  );
};

export default Sidebar;
