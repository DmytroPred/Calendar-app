import { CalendarEvent } from '../../models/event';

interface Props {
  eventList: CalendarEvent[];
}

const EventList = ({ eventList }: Props) => {
  return (
    <>
      {eventList.map((event) => {
        return (
          <div
            key={event.id}
            className='flex flex-col border border-gray-300 rounded-xl p-6 gap-3 bg-blue-50 w-full'
          >
            <h3 className='text-xl truncate'>{event.title}</h3>

            <div className='flex flex-col justify-between flex-grow'>
              <p className='text-gray-600'>{event.description}</p>
              <span className='text-end'>{event.time}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default EventList;
