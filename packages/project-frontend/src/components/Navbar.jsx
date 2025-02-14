import { CiCalendar } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";


function Navbar() {
    return (
        <>
            <div className="flex justify-between h-16 bg-navbar items-center">
                <h1 className="text-light-text text-5xl ml-4">Home</h1>
                <div className="flex items-center mr-4 gap-2">
                    <CiCalendar className="text-light-text text-[3.5rem]"/>
                    <CgProfile className="text-light-text text-[3rem]"/>
                </div>
            </div>
        </>
    );
}

export default Navbar;