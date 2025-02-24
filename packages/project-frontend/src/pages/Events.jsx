import { useState, useEffect } from "react";

import Event from "../components/Event";
import Calendar from "../components/Calendar";
import EventModal from "../components/EventModal";

// Mock Event Data
const upcoming_events = [
  {
    id: 1,
    title: "Beach Cleanup",
    date: "2025-02-28",
    location: "Santa Monica",
    description:
      "Join us for our monthly beach cleanup! Help preserve our coastal environment by removing trash and plastic waste from the beach. Please bring sunscreen and water. Equipment will be provided.",
  },
  {
    id: 2,
    title: "Park Tree Planting",
    date: "2025-03-25",
    location: "Central Park",
    description:
      "Help increase our city's green canopy by planting new trees in Central Park. Learn proper tree planting techniques and contribute to urban sustainability. All tools and saplings will be provided.",
  },
  {
    id: 3,
    title: "Food Drive",
    date: "2025-04-01",
    location: "Community Center",
    description:
      "Support our local food bank by participating in our spring food drive. We're collecting non-perishable food items to help families in need. Every donation makes a difference in our community.",
  },
];

const user_events = [
  {
    id: 4,
    title: "Community Garden Prep",
    date: "2025-02-22",
    location: "Sunset Park",
    description:
      "Help us prepare the community garden for spring! We'll be clearing weeds, refreshing soil, and planting early-season crops. No experience necessary—just bring gloves and a willingness to get your hands dirty!",
  },
  {
    id: 5,
    title: "Homeless Shelter Meal Service",
    date: "2025-02-24",
    location: "Downtown Shelter",
    description:
      "Join us in preparing and serving warm meals to those in need at the local homeless shelter. Volunteers will assist with cooking, plating, and distributing food. A great way to give back to the community!",
  },
  {
    id: 6,
    title: "River Cleanup",
    date: "2025-02-28",
    location: "Greenway Riverbank",
    description:
      "Help keep our waterways clean by removing trash and debris from the Greenway Riverbank. Gloves and trash bags will be provided. Let's work together to protect local wildlife and the environment!",
  },
];

function Events() {
  const [userEvents, setUserEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // event function either none, register, cancel
  const [eventFunction, setEventFunction] = useState("");
  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a random loading time (between 2 to 3 seconds)
    const loadTime = Math.random() * 1000 + 2000;
    setTimeout(() => {
      setUserEvents(user_events);
      setUpcomingEvents(upcoming_events);
      setLoading(false);
    }, loadTime);
  }, []);

  return (
    <>
      <div className="bg-primary">
        <div className="flex flex-col items-center">
          {/* Events List */}
          <h1 className="mt-8 mb-4 text-3xl text-dark-text font-semibold">
            Upcoming Events
          </h1>
          {/* Loading State */}
          {loading && <p>Events Loading...</p>}

          <div className="flex flex-col gap-4">
            {userEvents.map((event) => (
              <Event
                key={event.id}
                event={event}
                setSelectedEvent={setSelectedEvent}
                eventFunction={"cancel"}
                setEventFunction={setEventFunction}
              />
            ))}
          </div>
          {/* Events Calender */}
          <h1 className="mt-8 mb-4 text-3xl text-dark-text font-semibold">
            Sign Up for Events
          </h1>
          <Calendar
            events={upcomingEvents}
            setSelectedEvent={setSelectedEvent}
            setEventFunction={setEventFunction}
          />
          <div className="mb-16" />
        </div>
      </div>
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          eventFunction={eventFunction}
          setEventFunction={setEventFunction}
          userEvents={userEvents}
          setUserEvents={setUserEvents}
        />
      )}
    </>
  );
}

export default Events;
