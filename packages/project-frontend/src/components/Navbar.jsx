import { Link } from "react-router";
import { CiCalendar } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";


function Navbar() {
    return (
        <>
            <div className="flex justify-between h-16 bg-background-dark items-center">
                <Link to="/login">
                    <h1 className="text-light-text text-5xl ml-4 hover:opacity-80 transition-opacity">Home</h1>
                </Link>
                <div className="flex items-center mr-4 gap-2">
                    <Link to="/events">
                        <CiCalendar className="text-light-text text-[3.5rem] hover:opacity-80 transition-opacity"/>
                    </Link>
                    <Link to="/profile">
                        <CgProfile className="text-light-text text-[3rem] hover:opacity-80 transition-opacity"/>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Navbar;