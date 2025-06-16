import { LucideFolderMinus } from "lucide-react";
import { check, heart, minus, plus, star } from "../../icons/SVG";

interface ProductCardSchema {
  name: string;
  description: string;
  price: string;
  rating: number;
  url: string;
  category: string;
  id: string;
  removeItem: (id: string) => void;
}

const CartCard = ({
  name,
  description,
  price,
  rating,
  url,
  id,
  removeItem

}: ProductCardSchema) => {
  return (
    <div className="sm:w-[30rem] md:w-full
    min-h-96 rounded-xl bg-white flex flex-col pb-6 hover:scale-105 transition-all duration-300 hover:cursor-pointer">
      {/* Image container */}
      <div
        style={{
          backgroundImage:
            `url(${url})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="w-full relative h-60 rounded-t-xl"
      >
       
      </div>

      {/* Details */}
      <div className="w-full  px-4 py-4">
        <div className="flex justify-between">
          <p className="font-extrabold text-xl">{name || "Rice"}</p>

         
        </div>
        <div className="w-full flex justify-between py-4">
          <p>${price || "0.99"}</p>
          <p>
            <span className="text-orange-500">{star}</span> {rating || 4.3}{" "}
            Ratings
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="w-full flex flex-col px-4 gap-2">
        <h1 className="font-extrabold text-lg">Description</h1>

        <div className="w-full">
          <p className="text-sm leading-relaxed">
            {description ||
              "LOREM IPISIMUCH JUICKLROJRKF FJFJKNF F IJF F N FJF rjjrkrkrkrjkrrjrk rkjrkjr rkrnr"}
          </p>
        </div>
      </div>

      {/* ADD to Cart */}
      <div className="w-full px-4 mt-6 flex justify-between gap-4">
        <button
          className="shadow-xl w-1/2
          bg-gray-300 text-white font-bold rounded-md py-4 hover:cursor-default
            transition-all "
        >
          <span>Added {check}</span>
        </button>

        <button
          onClick={() => removeItem(id)}
          className="shadow-xl w-1/2
           bg-red-600 text-white font-bold rounded-md py-4 hover:brightness-90 active:brightness-75
            hover:cursor-pointer transition-all "
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartCard;
