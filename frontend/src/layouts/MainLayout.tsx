import { Outlet } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import SideBar from "./components/SideBar";
import MusicPlayer from "../components/MusicPlayer";


const MainLayout = () => {
    return (
        <>
            <div className="flex h-screen w-screen">
                <TopNavBar />
                <SideBar />

                <main className="flex-1 p-16 ml-64 mt-16 overflow-y-auto">
                    <Outlet />
                </main>
            </div>

            <div className="fixed bottom-0 left-76 right-0 z-50">
           
            <MusicPlayer/>
            
            </div>

        </>
    );
};

export default MainLayout;
