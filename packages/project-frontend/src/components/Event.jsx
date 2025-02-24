function Event({ event, setSelectedEvent, eventFunction, setEventFunction }) {
  const handleEventClick = () => {
    setEventFunction(eventFunction);
    setSelectedEvent(event);
  };

  return (
    <>
      <div
        className="flex flex-col items-center gap-0.5 py-4 px-2 bg-secondary w-72 rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
        onClick={handleEventClick}
      >
        <h2 className="font-medium text-2xl text-dark-text text-center">
          {event.title}
        </h2>
        <h3 className="text-center text-dark-text">{event.date}</h3>
        <h4 className="font-medium text-lg text-center text-dark-text">
          {event.location}
        </h4>
      </div>
    </>
  );
}

export default Event;
