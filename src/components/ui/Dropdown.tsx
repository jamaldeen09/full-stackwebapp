"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "/Users/macbook/cookie-auth-app/src/components/ui/dropdown-menu";

import { Button } from "/Users/macbook/cookie-auth-app/src/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faUser,faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "/Users/macbook/cookie-auth-app/src/redux/hooks";
import { setAccDetails } from "/Users/macbook/cookie-auth-app/src/redux/Auth/accountDetails";



export function Dropdown() {
  const navigate = useNavigate();
  const selector = useAppSelector(state => state)
  const newUser = selector.account
  const dispatch = useAppDispatch()

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
        className="text-4xl bg-white text-black px-4 py-2 hover:bg-white hover:scale-105">
            <FontAwesomeIcon icon={faBars} 
            />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/")}
        className="flex gap-4">
             <FontAwesomeIcon icon={faHouse} />
            <p>Home</p>
        </DropdownMenuItem>
        {
          newUser.isLoggedIn ? <DropdownMenuItem className="flex gap-4" onClick={() => navigate("/profile")}>
          <img
             src={newUser.imgUrl}
             className="w-6 rounded-full h-6 hover:cursor-pointer hover:scale-105"
           />
         <p>Profile</p>
       </DropdownMenuItem> : <DropdownMenuItem>
         <FontAwesomeIcon icon={faUser} />
         <p>Profile</p>
       </DropdownMenuItem>
        }
        <DropdownMenuItem className="flex gap-4" onClick={() => navigate("/cart")}>
          <FontAwesomeIcon icon={faCartShopping} />
          <p>Cart</p>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
         {newUser.isLoggedIn ? "" :  <DropdownMenuItem 
        onClick={() => navigate("/signup")}>
           Create Account
        </DropdownMenuItem>}

       {newUser.isLoggedIn ?  <DropdownMenuItem onClick={GETlogout}>
           Log out
        </DropdownMenuItem> :  <DropdownMenuItem onClick={() => navigate("/login")}>
           Log In
        </DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
