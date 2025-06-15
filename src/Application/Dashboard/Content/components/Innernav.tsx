import { harmBurgerMenu, user } from "../../icons/SVG"
import { activateCanvas } from "../../../../redux/Sidebar/CanvasSlice"
import { useAppDispatch } from "../../../../redux/hooks"


interface InnernavProps {
    name: string
}

const Innernav = ({ name }: InnernavProps) => {
    const dispatch = useAppDispatch();
  return (
    <nav 
      className="py-4 px-10"
    >
        {/* Big Screens */}
        <div className="justify-end gap-6 items-center hidden lg:flex">
           <img 
             src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" 
             alt="" 
             className="img w-10 h-10 rounded-full hover:scale-125 transition-all duration-300 hover:cursor-pointer hover:brightness-90 active:brightness-75"
            />
         
           <p>{name || "Jamaldeen"}</p>
        </div>

        {/* Small Screens */}
        <div
          className="flex items-center justify-between lg:hidden"
        >
            <p onClick={() => dispatch(activateCanvas())}
            className="font-bold text-2xl bg-purple-500 text-white w-10 h-10 rounded-md shadow-xl hover:scale-110
            hover:brightness-90 flex justify-center items-center transition-all hover:cursor-pointer">{harmBurgerMenu}</p>

            <div className="flex gap-6 items-center">
            <img 
             src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" 
             alt="" 
             className="img w-10 h-10 rounded-full hover:scale-125 transition-all duration-300 hover:cursor-pointer hover:brightness-90 active:brightness-75"
            />
         
           <p>{name || "Jamaldeen"}</p>
            </div>
        </div>
    </nav>
  )
}

export default Innernav