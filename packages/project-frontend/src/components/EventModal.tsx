import { EventData, EventFunctionType } from "../types/types";

type EventModalProps = {
  event: EventData;
  setSelectedEvent: (event: EventData | null) => void;
  eventFunction: EventFunctionType;
  setEventFunction: (func: EventFunctionType) => void;
  userEvents: Array<EventData>;
  setUserEvents: (events: Array<EventData>) => void;
};

function EventModal({
  event,
  setSelectedEvent,
  eventFunction,
  setEventFunction,
  userEvents,
  setUserEvents,
}: EventModalProps) {
  const handleClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedEvent(null);
    }
    setEventFunction("none");
  };

  const handleRegister = (e: React.MouseEvent) => {
    // Check if the event is already registered to avoid duplicates
    if (!userEvents.some((userEvent) => userEvent.id === event.id)) {
      setUserEvents([...userEvents, event]);
      console.log(`Registered for ${event.title}`);
    } else {
      console.log(`Already registered for ${event.title}`);
    }
    handleClose(e);
  };

  const handleCancel = (e: React.MouseEvent) => {
    setUserEvents(userEvents.filter((userEvent) => userEvent.id !== event.id));
    console.log(`Canceled registration for ${event.title}`);
    handleClose(e);
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
          <p className="text-dark-text">{event.date.getDate()}</p>

          <h3 className="text-2xl font-medium mb-2 text-dark-text">Location</h3>
          <p className="text-dark-text">{event.location.city}</p>

          <h3 className="text-2xl font-medium mb-2 text-dark-text">
            Description
          </h3>
          <p className="text-dark-text">{event.description}</p>

          {/* Register Button */}
          {eventFunction === "register" && (
            <button
              className="bg-background-dark text-light-text px-6 py-3 rounded-md w-full mt-4"
              onClick={handleRegister}
            >
              Register for Event
            </button>
          )}

          {/* Cancel Button */}
          {eventFunction === "cancel" && (
            <button
              className="bg-background-dark text-light-text px-6 py-3 rounded-md w-full mt-4"
              onClick={handleCancel}
            >
              Cancel Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventModal;
