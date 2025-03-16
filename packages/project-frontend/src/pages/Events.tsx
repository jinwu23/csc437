import { useState, useEffect } from "react";

import { EventFunctionType, EventData, UserData } from "../types/types";

import Event from "../components/Event";
import Calendar from "../components/Calendar";
import EventModal from "../components/EventModal";

type EventProps = {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  authToken: any;
};

function Events({ userData, setUserData, authToken }: EventProps) {
  const [userEvents, setUserEvents] = useState<Array<EventData>>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Array<EventData>>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  // event function either none, register, cancel
  const [eventFunction, setEventFunction] = useState<EventFunctionType>("none");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the events a user is signed up for
    const fetchUserEvents = async () => {
      setLoading(true);
      try {
        // Get the user ID from localStorage or wherever you store it
        const safeUserData = userData as UserData;
        const userId = safeUserData.id;

        if (!userId) {
          console.error("User ID not found");
          setLoading(false);
          return;
        }

        // Fetch the user's attending events
        const response = await fetch(`/api/user/${userId}/events/attending`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();

        if (data.type === "success") {
          // Convert string dates to Date objects
          const eventsWithDates = data.data.map((event: any) => ({
            ...event,
            date: new Date(event.date),
          }));

          setUserEvents(eventsWithDates);
        } else {
          console.error("Failed to fetch user events:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user events:", error);
      } finally {
        setLoading(false);
      }
    };

    // fetch Events that are upcoming
    const fetchUpcomingEvents = async () => {
      try {
        const response = await fetch("/api/events", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const data = await response.json();
        console.log(data);

        if (data.type === "success") {
          const eventsWithDates = data.data.map((event: any) => ({
            ...event,
            date: new Date(event.date),
          }));

          setUpcomingEvents(eventsWithDates);
        } else {
          console.error("Failed to fetch events:", data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchUserEvents();
    fetchUpcomingEvents();
  }, []);

  return (
    <>
      <div className="bg-primary min-h-screen">
        <div className="flex flex-col items-center lg:flex-row">
          <div className="flex flex-col items-center">
            {/* Admin Only Event Creation */}
            {}
            {/* Events List */}
            <div className="lg:ml-8">
              <h1 className="mt-8 mb-4 text-3xl text-dark-text font-semibold">
                Upcoming Events
              </h1>
              {/* Loading State */}
              {loading && <p className="text-dark-text">Events Loading...</p>}

              {/* No Upcoming events */}
              {userEvents.length === 0 && (
                <div className="flex justify-center">
                  <p className="text-dark-text ">No upcoming events</p>
                </div>
              )}

              <div className="flex flex-col gap-4">
                {userEvents.map((event) => (
                  <Event
                    key={event.id.toString()}
                    event={event}
                    setSelectedEvent={setSelectedEvent}
                    eventFunction={"cancel"}
                    setEventFunction={setEventFunction}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Events Calender */}
          <div className="lg:mb-8 ">
            <h1 className="mt-8 mb-4 text-3xl text-dark-text font-semibold text-center">
              Sign Up for Events
            </h1>
            <div className="w-full overflow-y-auto">
              <Calendar
                events={upcomingEvents}
                setSelectedEvent={setSelectedEvent}
                setEventFunction={setEventFunction}
              />
            </div>
          </div>
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
