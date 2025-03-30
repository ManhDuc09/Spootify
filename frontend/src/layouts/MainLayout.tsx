import { Outlet } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import SideBar from "./components/SideBar";

const MainLayout = () => {
    return (
        <>
            <TopNavBar />
            <div className="flex">
                <SideBar />
                <main className="flex-1 p-4 ml-64 mt-16 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default MainLayout;
