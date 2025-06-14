import { arrow } from "../../icons/SVG"

interface cardProps {
    styles: string
}

const CardComponent = ({ styles }: cardProps) => {
  return (
    <div style={{backgroundImage: "url(https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Cheeseburger-3d7c922.jpg?quality=90&resize=556,505)" , 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
      className={`w-full rounded-xl shadow-xl hover:scale-105 transition-all flex justify-end flex-col ${styles}
      max-w-xl
      h-80
      sm:max-w-lg
      md:max-w-md md:h-56 
      lg:max-w-xl`}>


        <div style={{borderBottom: "none"}}
        className="w-full border-t border-white h-12 text-white flex justify-between items-center px-10 hover:brightness-75 hover:cursor-pointer transition-all">
           <h1>See more</h1>
           <p>{arrow}</p>
        </div>
    </div>
  )
}

export default CardComponent