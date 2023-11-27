import { CalendarEvent } from '../../models/event';

interface Props {
  dayEvents: CalendarEvent[];
  selectEventHandler: (
    event: CalendarEvent,
    mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

const CalendarEventList = ({ dayEvents, selectEventHandler }: Props) => {
  return (
    <>
      {dayEvents.map((event: CalendarEvent) => {
        return (
          <div
            key={event.id}
            onClick={(mouseEvent) => selectEventHandler(event, mouseEvent)}
            className='bg-blue-200 p-1 text-gray-600 text-sm rounded mb-1 truncate hover:bg-blue-300'
          >
            {event.time + ' ' + event.title}
          </div>
        );
      })}
    </>
  );
};

export default CalendarEventList;
