import { Outlet } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import SideBar from "./components/SideBar";
import MusicPlayer from "../components/MusicPlayer";


const MainLayout = () => {
  return (
    <>
      <div className="flex h-screen w-screen relative">
        <TopNavBar />
        <SideBar />

        <main className="flex-1 p-16 pb-64 ml-64  overflow-y-auto mt-16 overflow-visible relative z-0">
          <Outlet />
        </main>
      </div>

      <div className="fixed bottom-0 left-76 right-0 z-40">
        <MusicPlayer />
      </div>
     
    </>
  );
};

export default MainLayout;
