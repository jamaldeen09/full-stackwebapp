import Navbar from "../components/NavBar"
import { Input } from "/Users/macbook/cookie-auth-app/src/components/ui/input"
const Login = () => {
  return (
    <>
      <Navbar />

      <div 
      className="min-h-screen flex justify-center items-center"
    >

        {/* Login form */}
        <form className="w-full max-w-2xl h-fit gap-6 flex flex-col">
            {/* Form Title */}
            <div className="w-full text-white flex justify-center items-center">
                <h1 className="flex font-extrabold text-3xl">Log In</h1>
            </div>

            {/* Form Body */}
            <div className="w-full flex flex-col gap-2 items-center justify-center">
                <Input 
                  className="isolate items-center flex justify-between  bg-white/5 shadow-lg ring-1 ring-black/5 text-white 
                  h-16 w-full max-w-sm
                  sm:max-w-lg
                  md:max-w-xl"
                  placeholder="Username"
                />
                <p className="text-red-600"></p>
            </div>

            <div className="w-full text-white flex justify-center items-center">
                <button className="w-full py-3 rounded-lg hover:brightness-90 active:brightness-75 bg-orange-500 max-w-sm
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