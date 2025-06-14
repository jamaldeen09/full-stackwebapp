import { harmBurgerMenu } from "../../icons/SVG"
import { activateCanvas } from "../../../../redux/Sidebar/CanvasSlice"
import { useAppDispatch } from "../../../../redux/hooks"


interface InnernavProps {
    title: string
}

const Innernav = ({ title }: InnernavProps) => {
    const dispatch = useAppDispatch();
  return (
    <nav 
      className="
      py-3 px-6
      iphone:px-4
      sm:px-8
      lg:px-10"
    >
        {/* Big Screens */}
        <div 
          className="w-full bg-white rounded-xl shadow-xl px-4 py-5 hidden lg:block"
        >
            <p className="font-bold">{title}</p>
        </div>

        {/* Small Screens */}
        <div
          className="flex items-center justify-between lg:hidden"
        >
            <p onClick={() => dispatch(activateCanvas())}
            className="font-bold text-2xl bg-purple-500 text-white w-10 h-10 rounded-md shadow-xl hover:scale-110
            hover:brightness-90 flex justify-center items-center transition-all hover:cursor-pointer">{harmBurgerMenu}</p>

            <div className="bg-white shadow-xl px-4 py-5 rounded-xl w-full 
            max-w-xs
            realSmall:w-56
            iphone:w-64
            sm:max-w-md
            md:max-w-xl">
                <p className="font-bold">{title}</p>
            </div>
        </div>
    </nav>
  )
}

export default Innernav