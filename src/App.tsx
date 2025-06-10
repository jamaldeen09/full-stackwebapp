import ECommerceApp from "./e-commerce/EcommerceApp"
import { useLocation,useNavigate } from "react-router"
import SingleProduct from "./e-commerce/SingleProduct";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Profile from "./Auth/Profile";
import CartPage from "./e-commerce/CartPage";


const App = () => {
  const location = useLocation()
  const navigate = useNavigate();
  return (
    location.pathname === "/productPage" ? <SingleProduct /> : location.pathname === "/" ? <ECommerceApp /> : location.pathname === "/login" ? <Login /> : location.pathname === "/signup" ? <SignUp /> : 
    location.pathname === "/profile" ? <Profile /> : location.pathname === "/cart" ? <CartPage /> :
    <div className="flex flex-col justify-center items-center gap-4 min-h-screen">
      <h1 className="text-5xl text-red-500 font-extrabold">404 Page Not Found</h1>
      <p onClick={() => navigate("/")}
      className="underline text-blue-500 hover:scale-105 hover:brightness-90 active:brightness-75 transition-all hover:cursor-pointer">Go back</p>
    </div>
  )
}

export default App