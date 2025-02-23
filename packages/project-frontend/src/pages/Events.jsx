import Event from "../components/Event"
import Calendar from "../components/Calendar";

// Mock Event Data
const events = [
    { id: 1, title: "Beach Cleanup", date: "2025-03-20", location: "Santa Monica" },
    { id: 2, title: "Park Tree Planting", date: "2025-03-25", location: "Central Park" },
    { id: 3, title: "Food Drive", date: "2025-04-01", location: "Community Center" },
];

function Events() {
    return (
        <>  
            <div className="bg-primary">
                <div className="flex flex-col items-center">
                    {/* Events List */}
                    <h1 className="mt-8 mb-4 text-3xl text-dark-text font-semibold">Upcoming Events</h1>
                    <div className="flex flex-col gap-4">
                        {events.map((event) => (
                            <Event
                                key={event.id}
                                title={event.title}
                                date={event.date}
                                location={event.location}
                            />
                        ))}
                    </div>
                    {/* Events Calender */}
                    <h1 className="mt-8 mb-4 text-3xl text-dark-text font-semibold">Sign Up for Events</h1>
                    <Calendar events={events} />
                    <div className="mb-16"/>
                </div>
            </div>
        </>
    );
}

export default Events