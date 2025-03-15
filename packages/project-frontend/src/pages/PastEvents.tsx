import { useState, useEffect } from "react";

import Event from "../components/Event";
import EventModal from "../components/EventModal";
import { EventData } from "../types/types";

function PastEvents() {
  const [pastEvents, setPastEvents] = useState<Array<EventData>>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      <div className="bg-primary min-h-screen">
        <div className="flex flex-col items-center px-4">
          <h1 className="mt-8 mb-6 text-4xl text-dark-text font-semibold">
            Past Events
          </h1>
          {/* Loading State */}
          {loading && <p className="text-dark-text">Events Loading...</p>}

          <div className="flex flex-col gap-4 max-w-2xl mb-16">
            {pastEvents.map((event) => (
              <Event
                key={event.id.toString()}
                event={event}
                setSelectedEvent={setSelectedEvent}
                eventFunction="none"
                setEventFunction={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          eventFunction="none"
          setEventFunction={() => {}}
          userEvents={pastEvents}
          setUserEvents={() => {}}
        />
      )}
    </>
  );
}

export default PastEvents;
