import Navbar from "../components/NavBar"
import { nameValidation } from "./Validation/validation"
import { Input } from "/Users/macbook/cookie-auth-app/src/components/ui/input"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useAppDispatch } from "../redux/hooks"
import { setAccDetails } from "../redux/Auth/accountDetails"

const Login = () => {
  // state management for username
  const [ username,setUsername ] = useState<string>("")
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [ accountNotFound,setAccountNotFound ] = useState<boolean>(false)
  
  // login
  
  const POSTlogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:4080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username })
      })

      const data = await response.json();
      if (!data.information){
        setUsername("")
        setAccountNotFound(true)
        return;
      }
      

      dispatch(setAccDetails(data.information))
      setUsername("");
      setTimeout(() => {
        navigate("/")
      }, 1000)
    } catch (err) {
      console.error(err)
    }
  }

 
  return (
    <>
      <Navbar />
      <div 
      className="min-h-screen flex justify-center items-center"
    >

        {/* Login form */}
        <form onSubmit={POSTlogin} className="w-full max-w-2xl h-fit gap-6 flex flex-col">
            {/* Form Title */}
            <div className="w-full text-white flex justify-center items-center">
                <h1 className="flex font-extrabold text-3xl">Log In</h1>
            </div>

            {/* Form Body */}
            <div className="w-full flex flex-col gap-2 items-center justify-center">
                <Input 
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  className="isolate items-center flex justify-between  bg-white/5 shadow-lg ring-1 ring-black/5 text-white 
                  h-16 w-full max-w-sm
                  sm:max-w-lg
                  md:max-w-xl"
                  placeholder="Username"
                />
                <p className="text-red-600">
                   {nameValidation(username) ? "" : accountNotFound ? "Account was not found. Please sign in" : "Invalid Username"}
                </p>
            </div>

            <div className="w-full text-white flex justify-center items-center">
                <button type="submit"
                className="w-full py-3 rounded-lg hover:brightness-90 active:brightness-75 bg-orange-500 max-w-sm
                sm:max-w-lg
                md:max-w-xl">
                    Log In
                </button>
            </div>
        </form>
    </div>
    </>
  )
}

export default Login