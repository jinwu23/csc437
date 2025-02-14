import Navbar from "./components/Navbar";
import Event from "./components/Event"



function App() {
    return (
        <>  
            <div className="h-screen bg-primary">
                <Navbar />
                <div className="flex flex-col items-center mt-4">
                    <h2 className="text-2xl text-dark-text font-semibold">Upcoming Events</h2>
                    <Event />
                </div>
            </div>
        </>
    );
}

export default App