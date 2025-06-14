import Navbar from "./components/Navbar"
import { Outlet, useLocation } from "react-router"

const Mainpage = () => {
  const location = useLocation()
  return (
    <div className="h-screen">
        {/* Navbar */}
        {
          location.pathname === "/" ? <Navbar title="Sign Up" /> :  location.pathname === "/login" ?  <Navbar title="Log In" /> : ""
        }
        {/* Form */}
        <div className="w-full flex justify-center items-center h-[90vh]">
          <Outlet />
        </div>
    </div>
  )
}

export default Mainpage