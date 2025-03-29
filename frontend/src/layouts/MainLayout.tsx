import { Outlet } from "react-router-dom"
import TopNavBar from "./components/TopNavBar"

const MainLayout = () => {
    return (
        <>
            <TopNavBar />
            <main className="mt-16">
                <Outlet />
            </main>
        </>
    )
}
export default MainLayout