import { Input } from "/Users/macbook/full-stack-webapp/src/components/ui/input"
import * as React from 'react';
import { useAppDispatch,useAppSelector } from ".././../redux/hooks"
import { resetEmail, setEmail } from ".././../redux/Auth/EmailSlice"
import { resetUsername, setUsername } from ".././../redux/Auth/UsernameSlice"
import { resetPassword, setPassword } from ".././../redux/Auth/PasswordSlice"
import { usernameValidation,emailValidation,passwordValidation } from "../Validation/FormValidation";
import { useState } from "react";
import { useNavigate } from "react-router";


const Signup = () => {
    // Global state management
    const dispatch = useAppDispatch()
    const selector = useAppSelector(state => state);

    const email = selector.emailAddress.email
    const password = selector.usersPassword.password
    const username = selector.username.username
    const navigate = useNavigate()

    // Utility function
    const resetInput = (): void => {
        dispatch(resetEmail())
        dispatch(resetPassword())
        dispatch(resetUsername())
    }

    // Local states
    const [ dataFetchFail,setDataFetchFail ] = useState<boolean>(false);
    const [ accFound,setAccFound ] = useState<boolean>(false);

    // Handle button Submitting
    const createAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate input
        const usernameValidity = usernameValidation(username)
        const emailValidity = emailValidation(email)
        const passwordValidity = passwordValidation(password);

        if (usernameValidity && emailValidity && passwordValidity) {
            try {
                const response = await fetch("http://localhost:4050/api/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        email: email
                    })
                })
                const rawData = await response.json()

                if (rawData.existingID){
                    resetInput();
                    setAccFound(true);
                    setDataFetchFail(false);
                    return;
                } else if (rawData.error) {
                    resetInput();
                    setDataFetchFail(true);
                    setAccFound(false);
                    return;
                } else {
                    localStorage.setItem("token", rawData.accessToken);
                    setAccFound(false);
                    setDataFetchFail(false);
                    resetInput();

                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 1000)
                    return;
                }
            } catch(err){
                console.error(err)
            }
        }
    }
  return (
    <form
      onSubmit={createAccount}
      className="w-full max-w-md flex flex-col gap-10 iphone:max-w-sm md:max-w-xl"
      method="POST"
    >
        {/* Form Head */}
        <div className="w-full flex justify-center items-center">
            <h1 className="font-bold text-3xl">Sign up</h1>
        </div>

        {/* Form Body */}
        <div className="w-full flex flex-col gap-6">
             
             {/* Email */}
             <div className="w-full flex justify-center items-center flex-col gap-4">
                <Input 
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => dispatch(setEmail(e.target.value))}
                  placeholder="Email"
                  className="w-full h-14"
                />
                <p className="text-red-500">
                {accFound
                 ? "You already have an account. Please Log in"
                 : dataFetchFail
                 ? "Invalid credentials"
                 : !emailValidation(email)
                 ? "Invalid email"
                 : ""
                }
                </p>
             </div>

             {/* Password */}
             <div className="w-full flex justify-center items-center flex-col gap-4">
                <Input 
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => dispatch(setPassword(e.target.value))}
                  placeholder="Password"
                  className="w-full h-14"
                />
                <p className="text-red-500">
                {accFound
                 ? "You already have an account. Please Log in"
                 : dataFetchFail
                 ? "Invalid credentials"
                 : !passwordValidation(password)
                 ? "Invalid password"
                 : ""
                }
                </p>
             </div>

             {/* Username */}
             <div className="w-full flex justify-center items-center flex-col gap-4">
                <Input 
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => dispatch(setUsername(e.target.value))}
                  placeholder="Username"
                  className="w-full h-14"
                />
                <p className="text-red-500">
                {accFound
                 ? "You already have an account. Please Log in"
                 : dataFetchFail
                 ? "Invalid credentials"
                 : !usernameValidation(username)
                 ? "Invalid username"
                 : ""
                }
                </p>
             </div>

              {/* ALready have an account */}
            <div className="w-full">
              <p 
                onClick={() => {
                    resetInput();
                    navigate("/login");
                }}
                className="w-fit underline text-blue-500 hover:cursor-pointer hover:brightness-90 active:brightness-75 transition-all">
                  Already have an account?
              </p>
            </div>
        </div>

        {/* Form End */}
        <div className="w-full flex justify-center items-center flex-col gap-4">
            <button 
              className="w-full bg-purple-500 text-white font-bold py-3 rounded-md hover:brightness-90 active:brightness-75 transition-all"
              type="submit"
            >
                Sign up
            </button>
        </div>
    </form>
  )
}

export default Signup