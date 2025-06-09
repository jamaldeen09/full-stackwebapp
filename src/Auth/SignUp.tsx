import Navbar from "../components/NavBar"
import { Input } from "/Users/macbook/cookie-auth-app/src/components/ui/input"
import { useAppDispatch,useAppSelector } from "../redux/hooks";
import { resetName, setName } from "../redux/Auth/username";
import { resetPassword, setPassword } from "../redux/Auth/password";
import { useState } from "react";
import { nameValidation,passwordValidation } from "./Validation/validation";
import { setAccDetails } from "../redux/Auth/accountDetails";
import { useNavigate } from "react-router";

const SignUp = () => {

    // Important
    const selector = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    // extracting name and password
    const name = selector.name.username
    const password = selector.Password.password
    const newUser = selector.account.accountDetails
    const navigate = useNavigate();
    const [ validation,setValidation ] = useState<boolean>(false)
    const [ accountFound,setAccountFound ] = useState<boolean>(false);


    // create POST request
    const POSTnewuser = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const nameValidity = nameValidation(name)
        const passwordValidity = passwordValidation(password)
       

        if (nameValidity && passwordValidity){
            try {
                const response = await fetch("http://localhost:4080/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: name, password: password }),
                    credentials: "include"
                })
                const data = await response.json();

                if (data.accountFound) {
                  setAccountFound(true);
                  dispatch(resetName())
                  dispatch(resetPassword())
                  return;
                }

                if (!data.accountDetails){
                    setValidation(true);
                    return;
                }

                if (data.accountDetails) {
                  console.log(data);
                  setAccountFound(false)
                  dispatch(setAccDetails(newUser))
                  dispatch(resetName())
                  dispatch(resetPassword())

                  setTimeout(() => {
                    navigate("/")
                  }, 1000)
                }
            } catch (err) {
                console.error(err)
            }
        }
    }
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex justify-center items-center">
        {/* Sign Up form */}
        <form onSubmit={POSTnewuser} className="w-full max-w-2xl h-fit gap-6 flex flex-col">
          {/* Form Title */}
          <div className="w-full text-white flex justify-center items-center">
            <h1 className="flex font-extrabold text-3xl">Sign Up</h1>
          </div>

          {/* Form Body */}
          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => dispatch(setName(e.target.value))}
              value={name}
              className="isolate items-center flex justify-between  bg-white/5 shadow-lg ring-1 ring-black/5 text-white 
            h-16 w-full max-w-sm
            sm:max-w-lg
            md:max-w-xl"
              placeholder="Username"
            />
            <p className="text-red-600">
                {nameValidation(name) ? "" : validation ? "Invalid Name" : accountFound ? "Account already exists" : "Invalid Name"}
            </p>
          </div>

          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => dispatch(setPassword(e.target.value))}
              value={password}
              className="isolate items-center flex justify-between  bg-white/5 shadow-lg ring-1 ring-black/5 text-white 
            h-16 w-full max-w-sm
            sm:max-w-lg
            md:max-w-xl"
              placeholder="Password"
            />
            <p className="text-red-600">
              {passwordValidation(password) ? "" : validation ? "Invalid Password" : accountFound ? "Account already exists" : "Invalid Password"}
            </p>
          </div>

          <div className="w-full text-white flex justify-center items-center">
            <button 
         
              type="submit"
              className="w-full py-3 rounded-lg hover:brightness-90 active:brightness-75 bg-orange-500 max-w-sm
            sm:max-w-lg
            md:max-w-xl"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
