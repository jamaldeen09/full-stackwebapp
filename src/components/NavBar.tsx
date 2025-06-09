import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { Dropdown } from "./ui/Dropdown"
import { useNavigate } from "react-router"


const NavBar = () => {
  const navigate = useNavigate()
  return (
    <nav 
      className="isolate items-center flex justify-between  bg-white/5 shadow-lg ring-1 ring-black/5
      p-6
      "
    >
      {/* Nav Title */}
        <div 
          className="flex justify-center items-center text-white gap-4 sm:gap-6"
        > 
          <img 
            src="https://img.freepik.com/premium-vector/online-shop-e-commerce-logo_1199645-37307.jpg?semt=ais_hybrid&w=740" 
            alt="Logo"
            className="rounded-full w-10 h-10 md:w-14 md:h-14"
          />
            
        <h1 className="font-extrabold text-lg sm:text-xl md:text-2xl">Wonderful Dishes</h1>
       </div>

       {/* Nav Login Button */}
       <div 
        className="text-white w-fit gap-4
        hidden md:flex justify-center items-center"
       >
      
          <p onClick={() => navigate("/")}
          className="hover:cursor-pointer hover:scale-110 hover:brightness-90 transition-all">Home</p>
           <p onClick={() => navigate("/login")}
           className="hover:cursor-pointer hover:scale-110 hover:brightness-90 transition-all">Login</p>
           <p onClick={() => navigate("/signup")}
           className="hover:cursor-pointer hover:scale-110 hover:brightness-90 transition-all">Create Account</p>

           <FontAwesomeIcon icon={faCartShopping} className="hover:scale-125 hover:cursor-pointer transition-all"/>
           <FontAwesomeIcon icon={faUser} className="p-2 rounded-full bg-black hover:scale-125 hover:cursor-pointer transition-all"/>
      </div>

      {/* Mobile  */}
      <div className="flex justify-center items-center md:hidden">
         <Dropdown />
      </div>
    </nav>
  )
}

export default NavBar