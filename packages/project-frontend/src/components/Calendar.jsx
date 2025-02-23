import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Calendar({events}) {
  const formattedEvents = events.map(event => ({
    title: event.title,
    start: event.date,
    allDay: true,
    extendedProps: {
      location: event.location
    }
  }));

  const renderEventContent = (eventInfo) => {
    return (
      <div className="p-1">
        <p className="font-semibold overflow-hidden">{eventInfo.event.title}</p>
        {eventInfo.event.extendedProps.location && (
          <p className="text-sm overflow-hidden">{eventInfo.event.extendedProps.location}</p>
        )}
      </div>
    );
  };

  return (
    <div className="mx-4 bg-secondary">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={formattedEvents}
        eventContent={renderEventContent}
        height="auto"
        aspectRatio={1.5}
      />
    </div>
  );
}