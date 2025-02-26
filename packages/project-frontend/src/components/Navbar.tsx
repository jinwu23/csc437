import { Link } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

type NavbarProps = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  return (
    <div className="flex justify-between h-16 bg-background-dark dark:bg-gray-900 items-center px-4">
      <Link to="/login">
        <h1 className="text-light-text dark:text-white text-5xl hover:opacity-80 transition-opacity">
          Home
        </h1>
      </Link>
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <label className="flex items-center gap-1 text-light-text">
          <span className="text-sm">Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </label>

        <Link to="/events">
          <CiCalendar className="text-light-text dark:text-white text-[3.5rem] hover:opacity-80 transition-opacity" />
        </Link>
        <Link to="/profile">
          <CgProfile className="text-light-text dark:text-white text-[3rem] hover:opacity-80 transition-opacity" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
