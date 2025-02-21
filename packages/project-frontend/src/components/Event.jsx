
function Event({title, date, location}) {
    return (
        <>
            <div className="flex flex-col items-center gap-0.5 py-4 bg-secondary w-72 rounded-xl">
                <h2 className="font-medium text-2xl text-dark-text">{title}</h2>
                <h3>{date}</h3>
                <h4 className="font-medium text-lg">{location}</h4>
            </div>
        </>
    );
}

export default Event;