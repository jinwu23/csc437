import { useState } from "react";
import { EventData, EventFunctionType, UserData } from "../types/types";

type EventModalProps = {
  event: EventData;
  setSelectedEvent: (event: EventData | null) => void;
  eventFunction: EventFunctionType;
  setEventFunction: (func: EventFunctionType) => void;
  userEvents: Array<EventData>;
  setUserEvents: (events: Array<EventData>) => void;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  authToken: string;
  isAdmin: boolean;
};

function EventModal({
  event,
  setSelectedEvent,
  eventFunction,
  setEventFunction,
  userEvents,
  setUserEvents,
  userData,
  setUserData,
  authToken,
  isAdmin,
}: EventModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedEvent(null);
    }
    setEventFunction("none");
  };

  const handleRegister = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!userData?.id) {
      setError("You must be logged in to register for events");
      return;
    }

    // Check if already registered locally to prevent unnecessary API calls
    if (userData.eventsAttending?.some((eventId) => eventId === event.id)) {
      console.log(`Already registered for ${event.title}`);
      handleClose(e);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Call API to register user for the event
      const response = await fetch(`/api/events/${event.id}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ userId: userData.id }),
      });

      const data = await response.json();

      if (data.type === "success") {
        setUserEvents([...userEvents, event]);

        // Update userData.eventsAttending
        const updatedEventsAttending = userData.eventsAttending
          ? [...userData.eventsAttending, event.id]
          : [event.id];

        setUserData({
          ...userData,
          eventsAttending: updatedEventsAttending,
        });

        console.log(`Successfully registered for ${event.title}`);
        handleClose(e);
      } else {
        setError(data.message || "Failed to register for event");
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!userData?.id) {
      setError("You must be logged in to cancel event registration");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/events/${event.id}/unregister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ userId: userData.id }),
      });

      const data = await response.json();

      if (data.type === "success") {
        // Update local state
        setUserEvents(
          userEvents.filter((userEvent) => userEvent.id !== event.id)
        );

        // Update userData.eventsAttending
        const updatedEventsAttending = userData.eventsAttending
          ? userData.eventsAttending.filter((eventId) => eventId !== event.id)
          : [];

        setUserData({
          ...userData,
          eventsAttending: updatedEventsAttending,
        });

        console.log(`Successfully canceled registration for ${event.title}`);
        handleClose(e);
      } else {
        setError(data.message || "Failed to cancel event registration");
      }
    } catch (error) {
      console.error("Error canceling event registration:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 bg-gray-500/70 flex items-center justify-center px-4"
      onClick={handleClose}
    >
      <div className="bg-secondary rounded-xl p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={() => setSelectedEvent(null)}
          className="absolute top-4 right-4 text-dark-text hover:text-gray-700"
        >
          ✖
        </button>

        {/* Event Content */}
        <div className="flex flex-col items-center text-center mt-2">
          <h2 className="text-3xl font-semibold text-dark-text mb-4">
            {event.title}
          </h2>
          <h3 className="text-2xl font-medium mb-2 text-dark-text">Date</h3>
          <p className="text-dark-text">{event.date.toDateString()}</p>

          <h3 className="text-2xl font-medium mb-2 text-dark-text">Location</h3>
          <p className="text-dark-text">{event.location.city}</p>

          <h3 className="text-2xl font-medium mb-2 text-dark-text">
            Description
          </h3>
          <p className="text-dark-text">{event.description}</p>

          {/* Error message display */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 rounded w-full">
              <p>{error}</p>
            </div>
          )}

          {/* Register Button */}
          {eventFunction === "register" && (
            <button
              className="bg-background-dark text-light-text px-6 py-3 rounded-md w-full mt-4"
              onClick={handleRegister}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Register for Event"}
            </button>
          )}

          {/* Cancel Button */}
          {eventFunction === "cancel" && (
            <button
              className="bg-background-dark text-light-text px-6 py-3 rounded-md w-full mt-4"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Cancel Registration"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventModal;
