import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

function MainLayout() {
    const location = useLocation();
    const hideNavbarPaths = ["/login"];

    return (
        <div>
            {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
            <Outlet />
        </div>
    );
}

export default MainLayout;
