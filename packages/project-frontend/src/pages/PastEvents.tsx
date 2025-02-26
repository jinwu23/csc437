import { useState, useEffect } from "react";

import Event from "../components/Event";
import EventModal from "../components/EventModal";
import { EventType } from "../types";

const past_events = [
  {
    id: 1,
    title: "Beach Cleanup",
    date: "2025-02-15",
    location: "Venice Beach",
    description:
      "We removed over 500 pounds of trash from Venice Beach in this successful cleanup event. Volunteers worked together to clear plastic waste, fishing lines, and other debris to protect our marine ecosystem.",
  },
  {
    id: 2,
    title: "Food Bank Volunteering",
    date: "2025-02-01",
    location: "Downtown Food Bank",
    description:
      "Our team helped sort and package over 1,000 meals for local families in need. We organized donations, checked expiration dates, and prepared food boxes for distribution to the community.",
  },
  {
    id: 3,
    title: "Park Maintenance",
    date: "2025-01-20",
    location: "City Park",
    description:
      "Volunteers helped restore and maintain our beloved City Park. Activities included clearing pathways, removing invasive plants, mulching gardens, and repairing playground equipment.",
  },
  {
    id: 4,
    title: "Elderly Home Visit",
    date: "2025-01-10",
    location: "Sunshine Care Home",
    description:
      "We spent the afternoon with residents at Sunshine Care Home, engaging in activities, sharing stories, and bringing joy to our senior community members. Activities included card games, crafts, and music sharing.",
  },
];

function PastEvents() {
  const [pastEvents, setPastEvents] = useState<Array<EventType>>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate a random loading time (between 2 to 3 seconds)
    const loadTime = Math.random() * 1000 + 2000;
    setTimeout(() => {
      setPastEvents(past_events);
      setLoading(false);
    }, loadTime);
  }, []);

  return (
    <>
      <div className="bg-primary min-h-screen">
        <div className="flex flex-col items-center px-4">
          <h1 className="mt-8 mb-6 text-4xl text-dark-text font-semibold">
            Past Events
          </h1>
          {/* Loading State */}
          {loading && <p>Events Loading...</p>}

          <div className="flex flex-col gap-4 max-w-2xl mb-16">
            {pastEvents.map((event) => (
              <Event
                key={event.id}
                event={event}
                setSelectedEvent={setSelectedEvent}
                eventFunction="none"
                setEventFunction={() => { }}
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
          setEventFunction={() => { }}
          userEvents={pastEvents}
          setUserEvents={() => { }}
        />
      )}
    </>
  );
}

export default PastEvents;
