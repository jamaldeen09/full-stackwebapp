import { useEffect, useState } from "react"
import Innernav from "../Content/components/Innernav"
import { useAppSelector } from "../../../redux/hooks"
import { P } from "framer-motion/dist/types.d-B_QPEvFK"
import { user } from "../icons/SVG"


const Profile = () => {
    // GET users information
      const information = useAppSelector(state => state.info.information)
  return (
    <div className="w-full">
        <Innernav name={information.username}/>

        <div className="w-full h-fit flex justify-center items-center flex-col gap-20">

            <div className="w-full px-6">
                <h1 className="font-bold text-xl">Profile</h1>
            </div>
            <div className="w-fit">
                {
                    <p className="text-4xl rounded-full bg-white text-gray-400 w-16  h-16 flex 
                    justify-center items-center hover:scale-110 hover:cursor-pointer hover:brightness-90 transition-all
                    active:brightness-75 duration-300">{user}</p>
                }
            </div>
            <div className="w-fit gap-6 flex flex-col text-center">
                <h1 className="font-extrabold text-3xl">Username: {information.username}</h1>
                <h2 className="font-extrabold text-2xl">Email: {information.email}</h2>
                <h2 className="font-extrabold text-2xl">Password: {information.password}</h2>
            </div>
        </div>
    </div>
  )
}

export default Profile