import { EventFunctionType, EventType } from "../types";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

type CalendarProps = {
  events: EventType[];
  setSelectedEvent: (event: EventType | null) => void;
  setEventFunction: (func: EventFunctionType) => void;
}

export default function Calendar({
  events,
  setSelectedEvent,
  setEventFunction,
}: CalendarProps) {
  const formattedEvents = events.map((event) => ({
    title: event.title,
    start: event.date,
    allDay: true,
    extendedProps: {
      location: event.location,
      description: event.description,
      originalId: event.id,
    },
  }));

  const renderEventContent = (eventInfo: any) => {
    return (
      <div className="p-1">
        <p className="font-semibold overflow-hidden">{eventInfo.event.title}</p>
        {eventInfo.event.extendedProps.location && (
          <p className="text-sm overflow-hidden">
            {eventInfo.event.extendedProps.location}
          </p>
        )}
      </div>
    );
  };

  const handleEventClick = (clickInfo: any) => {
    const originalEvent = events.find(
      (event) => event.id === clickInfo.event.extendedProps.originalId
    );
    setEventFunction("register");
    setSelectedEvent(originalEvent || null);
  };

  return (
    <div className="mx-4 bg-secondary">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={formattedEvents}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        height="auto"
        aspectRatio={1.5}
      />
    </div>
  );
}
