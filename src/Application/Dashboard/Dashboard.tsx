import { Outlet } from "react-router"
import Sidebar from "./Sidebar"


const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 grid grid-cols-10 gap-2">

        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="w-full  h-full col-span-10 lg:col-span-8">
            
            <Outlet />
        </div>
    </div>
  )
}

export default Dashboard