import { aiIcon, cart, house, logout, product, reactIcon, x } from "./icons/SVG"
import { useLocation, useNavigate } from "react-router"
import { useAppSelector,useAppDispatch } from "../../redux/hooks"
import { deactivateCanvas } from "../../redux/Sidebar/CanvasSlice";


const Sidebar = () => {
  // Important
  const location = useLocation();
  const navigate = useNavigate();
  // Global states
  const canvasState = useAppSelector(state => state.offcanvas.canvasActivator);
  const dispatch = useAppDispatch()
  return (
    <>
    <div 
      className="py-6 overflow-y-auto bg-white rounded-2xl shadow-xl col-span-2
      hidden
      midIpad:px-3
      lg:flex flex-col gap-10 lg:px-4"
    >
      {/* SideBar Title */}
      <div className="w-full flex items-center gap-4">
        <img 
          className="w-10 h-10"
          src="https://bcassetcdn.com/public/blog/wp-content/uploads/2023/05/22145512/letter-p-with-phoenix-logo-design-by-roniphics-dribbble.png" 
          alt="Logo" 
        />
        <h1 className="flex justify-center items-center text-2xl font-extrabold">
          Jonz
        </h1>
      </div>

      {/* Navigation */}
      <div className="w-full flex flex-col gap-4">
        <div className="w-full ">
          <h1 className="text-gray-500 text-md midIpad:text-sm">Navigation</h1>
        </div>

        {/* Route Linkers */}
        <ul className="flex flex-col gap-4">

          <li onClick={() => navigate("/dashboard")}
            className={`text-md midIpad:text-sm text-gray-400 hover:bg-gray-100 hover:cursor-pointer active:brightness-95 transtion-all
            flex items-center gap-3 p-4 ${location.pathname === "/dashboard" ? " bg-gray-100 rounded-md hover:brightness-95 hover:cursor-pointer" : ""}`}>
            <p className={`${location.pathname === "/dashboard" ? "text-black" : "text-gray-400"}`}>{house}</p>
            <p className={`${location.pathname === "/dashboard" ? "text-black" : "text-gray-400"}`}>Dashboard</p>
          </li>

          <li onClick={() => navigate("products")}
            className={`text-md midIpad:text-sm text-gray-400
            flex hover:bg-gray-100 hover:cursor-pointer active:brightness-95 transtion-all
            items-center gap-3 p-4 ${location.pathname === "/dashboard/products" ? "bg-gray-100 rounded-md text-black" : ""}`}>
            <p className={`${location.pathname === "/dashboard/products" ? "text-black" : "text-gray-400"}`}>{product}</p>
            <p className={`${location.pathname === "/dashboard/products" ? "text-black" : "text-gray-400"}`}>Products</p>
          </li>

           <li onClick={() => navigate("cart")}
            className={`text-md midIpad:text-sm text-gray-400
            flex hover:bg-gray-100 hover:cursor-pointer active:brightness-95 transtion-all
            items-center gap-3 p-4 ${location.pathname === "/dashboard/cart" ? "bg-gray-100 rounded-md text-black" : ""}`}>
            <p className={`${location.pathname === "/dashboard/cart" ? "text-black" : "text-gray-400"}`}>{cart}</p>
            <p className={`${location.pathname === "/dashboard/cart" ? "text-black" : "text-gray-400"}`}>Cart</p>
          </li>


          <li onClick={() => navigate("chatbot")}
            className={`text-md midIpad:text-sm text-gray-400
            hover:bg-gray-100 hover:cursor-pointer active:brightness-95 transtion-all
            flex items-center gap-3 p-4 ${location.pathname === "/dashboard/chatbot" ? "bg-gray-100 rounded-md text-black" : ""}`}>
             <p className={`${location.pathname === "/dashboard/chatbot" ? "text-black" : "text-gray-400"}`}>{aiIcon}</p>
             <p className={`${location.pathname === "/dashboard/chatbot" ? "text-black" : "text-gray-400"}`}>Chatbot</p>
          </li>

        </ul>
      </div>

      {/* Apps Used */}
      <div className="w-full border-t border-gray-300 py-6 flex flex-col gap-6">

        <div className="w-full">
          <h1 className="text-gray-500 text-md midIpad:text-sm">Technologies</h1>
        </div>

        <div className="w-full flex flex-col gap-10">

           <div className="flex gap-4 items-center">
              {reactIcon} 
             <p className="text-md midIpad:text-sm">React JS</p>
            </div>

            <div className="flex gap-4 items-center ">
               <img
                  src="https://shadowblood.gallerycdn.vsassets.io/extensions/shadowblood/tailwind-moon/3.0.2/1673948732518/Microsoft.VisualStudio.Services.Icons.Default" 
                  alt="Tailwind Icon"
                  className="midIpad:w-8 midIpad:h-8 lg:w-8 lg:h-8" 
                />

              <p className="text-md midIpad:text-sm">Tailwind</p>
           </div>

           <div className="flex gap-4 items-center ">
              <img 
                src="https://www.pngfind.com/pngs/m/136-1363736_express-js-icon-png-transparent-png.png"
                alt="" 
                className="bg-white rounded-full midIpad:w-8 midIpad:h-6 lg:w-10 lg:h-8" 
              />
              
              <p className="text-md midIpad:text-sm">Express</p>
           </div>
        </div>
      </div>


        {/* Logout */}
      <div className="w-full flex justify-center items-center gap-4 ">
        <div className="w-fit flex gap-4 hover:text-red-600 hover:cursor-pointer">
          <p className="text-md midIpad:text-sm">
            {logout}
          </p>
          <p className="text-md midIpad:text-sm">
            Logout
          </p>
        </div>
      </div>
    </div>



    {/* MOBILE OFFCANVAS */}
    <div
      className={`
      transition-transform duration-300 ease-in-out
      transform fixed top-0 left-0 w-80 h-full z-50 bg-white shadow-xl rounded-2xl overflow-y-auto px-5 py-6 gap-10 flex flex-col
      lg:hidden
      ${canvasState ? "translate-x-0" : "-translate-x-full"}
    `}
>
      {/* SideBar Title */}
      <div className="w-full flex items-center gap-4 justify-between">
         <div className="flex gap-4">
         <img 
          className="w-10 h-10"
          src="https://bcassetcdn.com/public/blog/wp-content/uploads/2023/05/22145512/letter-p-with-phoenix-logo-design-by-roniphics-dribbble.png" 
          alt="Logo" 
        />
        <h1 className="flex justify-center items-center text-2xl font-extrabold">
          Jonz
        </h1>
         </div>

         <div onClick={() => dispatch(deactivateCanvas())}
         className="w-fit hover:cursor-pointer">
            <p >{x}</p>
         </div>
      </div>

      {/* Navigation */}
      <div className="w-full flex flex-col gap-4">
        <div className="w-full ">
          <h1 className="text-gray-500">Navigation</h1>
        </div>

        {/* Route Linkers */}
        <ul className="flex flex-col gap-4">
          <li onClick={() => navigate("/dashboard")}
            className={`text-md midIpad:text-sm text-gray-400 hover:bg-gray-100 hover:cursor-pointer active:brightness-95 transtion-all
            flex items-center gap-3 p-4 ${location.pathname === "/dashboard" ? " bg-gray-100 rounded-md hover:brightness-95 hover:cursor-pointer" : ""}`}>
            <p className={`${location.pathname === "/dashboard" ? "text-black" : "text-gray-400"}`}>{house}</p>
            <p className={`${location.pathname === "/dashboard" ? "text-black" : "text-gray-400"}`}>Dashboard</p>
          </li>

          <li onClick={() => navigate("products")}
            className={`text-md midIpad:text-sm text-gray-400
            flex hover:bg-gray-100 hover:cursor-pointer active:brightness-95 transtion-all
            items-center gap-3 p-4 ${location.pathname === "/dashboard/products" ? "bg-gray-100 rounded-md text-black" : ""}`}>
            <p className={`${location.pathname === "/dashboard/products" ? "text-black" : "text-gray-400"}`}>{product}</p>
            <p className={`${location.pathname === "/dashboard/products" ? "text-black" : "text-gray-400"}`}>Products</p>
          </li>

          <li onClick={() => navigate("cart")}
            className={`text-md midIpad:text-sm text-gray-400
            flex hover:bg-gray-100 hover:cursor-pointer active:brightness-95 transtion-all
            items-center gap-3 p-4 ${location.pathname === "/dashboard/cart" ? "bg-gray-100 rounded-md text-black" : ""}`}>
            <p className={`${location.pathname === "/dashboard/cart" ? "text-black" : "text-gray-400"}`}>{cart}</p>
            <p className={`${location.pathname === "/dashboard/cart" ? "text-black" : "text-gray-400"}`}>Cart</p>
          </li>


          <li onClick={() => navigate("chatbot")}
            className={`text-md midIpad:text-sm text-gray-400
            hover:bg-gray-100 hover:cursor-pointer active:brightness-95 transtion-all
            flex items-center gap-3 p-4 ${location.pathname === "/dashboard/chatbot" ? "bg-gray-100 rounded-md text-black" : ""}`}>
             <p className={`${location.pathname === "/dashboard/chatbot" ? "text-black" : "text-gray-400"}`}>{aiIcon}</p>
             <p className={`${location.pathname === "/dashboard/chatbot" ? "text-black" : "text-gray-400"}`}>Chatbot</p>
          </li>

        </ul>
      </div>

      {/* Apps Used */}
      <div className="w-full border-t border-gray-300 py-6 flex flex-col gap-6">

        <div className="w-full">
          <h1 className="text-gray-500">Technologies</h1>
        </div>

        <div className="w-full flex flex-col gap-10">

           <div className="flex gap-4 items-center">
              {reactIcon} 
             <p>React JS</p>
            </div>

            <div className="flex gap-4 items-center ">
               <img
                  src="https://shadowblood.gallerycdn.vsassets.io/extensions/shadowblood/tailwind-moon/3.0.2/1673948732518/Microsoft.VisualStudio.Services.Icons.Default" 
                  alt="Tailwind Icon"
                  className="w-8 h-8" 
                />

              <p>Tailwind</p>
           </div>

           <div className="flex gap-4 items-center ">
              <img 
                src="https://www.pngfind.com/pngs/m/136-1363736_express-js-icon-png-transparent-png.png"
                alt="" 
                className="w-10 h-8 bg-black rounded-full" 
              />
              
              <p>Express</p>
           </div>
        </div>
      </div>


        {/* Logout */}
      <div className="w-full flex justify-center items-center gap-4 ">
        <div className="w-fit flex gap-4 hover:text-red-600 hover:cursor-pointer text-md midIpad:text-sm">
          <p >
            {logout}
          </p>
          <p>
            Logout
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Sidebar