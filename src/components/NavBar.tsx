import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "./ui/Dropdown";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setAccDetails } from "../redux/Auth/accountDetails";

const NavBar = () => {
  const navigate = useNavigate();
  const newUser = useAppSelector((state) => state.account);
  
  const dispatch = useAppDispatch();


  // Logout
  const GETlogout = async () => {
    fetch("http://localhost:4080/api/logout", {
      method: "GET"
    })
    .then (response => {
      if (!response.ok) {
        throw new Error ("Fetch Failed")
      }
      return response.json()
    })
    .then(data => {
      console.log(data);

      dispatch(setAccDetails({
        isLoggedIn: false,
        id: null,
        username: '',
        imgUrl: '',
        cart: []
      }))

      setTimeout(() => {
        navigate("/login")
      }, 1000)
    })
    .catch(err => {
      console.error(err)
    })
  }
   
  return (
    <nav
      className="isolate items-center flex justify-between  bg-white/5 shadow-lg ring-1 ring-black/5
      p-6
      "
    >
      {/* Nav Title */}
      <div className="flex justify-center items-center text-white gap-4 sm:gap-6">
        <img
          src="https://img.freepik.com/premium-vector/online-shop-e-commerce-logo_1199645-37307.jpg?semt=ais_hybrid&w=740"
          alt="Logo"
          className="rounded-full w-10 h-10 md:w-14 md:h-14"
        />

        <h1 className="font-extrabold text-lg sm:text-xl md:text-2xl">
          Wonderful Dishes
        </h1>
      </div>

      {/* Nav Login Button */}
      <div
        className="text-white w-fit gap-4
        hidden md:flex justify-center items-center"
      >
        <p
          onClick={() => navigate("/")}
          className="hover:cursor-pointer hover:scale-110 hover:brightness-90 transition-all"
        >
          Home
        </p>
        {newUser.isLoggedIn ? (
          <p onClick={GETlogout}
          className="hover:cursor-pointer hover:scale-110 transition-all">
            Log Out
          </p>
        ) : !newUser ? <p
        onClick={() => navigate("/login")}
        className="hover:cursor-pointer hover:scale-110 hover:brightness-90 transition-all"
      >
        Login
      </p> : (
          <p
            onClick={() => navigate("/login")}
            className="hover:cursor-pointer hover:scale-110 hover:brightness-90 transition-all"
          >
            Login
          </p>
        )}
        {newUser.isLoggedIn ? (
          ""
        ) : !newUser ? <p
        onClick={() => navigate("/signup")}
        className="hover:cursor-pointer hover:scale-110 hover:brightness-90 transition-all"
      >
        Create Account
      </p> : (
          <p
            onClick={() => navigate("/signup")}
            className="hover:cursor-pointer hover:scale-110 hover:brightness-90 transition-all"
          >
            Create Account
          </p>
        )}

        <FontAwesomeIcon
          onClick={() => navigate("/cart")}
          icon={faCartShopping}
          className="hover:scale-125 hover:cursor-pointer transition-all"
        />
        {newUser.isLoggedIn ? (
          <div className="flex space-x-2 items-center">
            <img
              onClick={() => navigate("/profile")}
              src={newUser.imgUrl}
              className="w-10 rounded-full h-10 hover:cursor-pointer hover:scale-105"
            />
            <p>{newUser.username}</p>
          </div>
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            className="p-2 rounded-full bg-black hover:scale-125 hover:cursor-pointer transition-all"
          />
        )}
      </div>

      {/* Mobile  */}
      <div className="flex justify-center items-center md:hidden">
        <Dropdown />
      </div>
    </nav>
  );
};

export default NavBar;
