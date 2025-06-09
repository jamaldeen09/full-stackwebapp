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



export function Dropdown() {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
        className="text-4xl bg-white text-black px-4 py-2">
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
            <p >Home</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-4">
          <FontAwesomeIcon icon={faUser} />
          <p>Profile</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-4">
          <FontAwesomeIcon icon={faCartShopping} />
          <p>Cart</p>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/signup")}>
           Create Account
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => navigate("/login")}>
           Log In
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
