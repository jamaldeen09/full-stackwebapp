import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons"
import Button from "../components/Button"
interface CardSchema {
    imageUrl: string,
    name: string,
    description: string,
    price: string,
    theme: string,
    id: number,
    btnColor: string,
    cardFunc: (id: number) => void;
}

const ProductCard = (props: CardSchema) => {
    const { imageUrl,name,description,price,theme,id,btnColor,cardFunc } = props
  return (
    <div 
      onClick={() => cardFunc(id)}
      style={{backdropFilter: "blur(10px)", backgroundColor: theme, border: `1px solid ${theme}`, boxShadow: `0 4px 6px ${theme} `}}
      className={`text-white flex flex-col gap-6 rounded-2xl hover:scale-105 transition-all pb-6 hover:cursor-pointer
      smallTablet:w-full smallTablet:max-w-xl`}
    >

        {/* Image container */}
        <div 
          className={`w-full rounded-2xl relative`}
        >
            <img 
              className="w-full h-80 rounded-t-2xl"
              src={imageUrl}
              alt={`${name} Image`} 
            />
            <FontAwesomeIcon icon={faShoppingBag} 
              className="bg-black text-white p-2 rounded-full absolute top-2 right-2
              hover:scale-105 hover:brightness-75 hover:cursor-pointer transition-all"
            />
        </div>

        {/* Text container */}
        <div className="w-full flex items-center flex-col px-10 gap-4">

            <div className="w-full flex justify-between">
              <h3 className="font-extrabold text-xl">{name || "None"}</h3>
              <h3>{price || "$50"}</h3>
            </div>

            <div className="w-full">
                <p>{description}</p>
            </div>
        </div>

        {/* button container */}
        <div className="w-full px-4">
            <Button background={btnColor}/>
        </div>
    </div>
  )
}

export default ProductCard