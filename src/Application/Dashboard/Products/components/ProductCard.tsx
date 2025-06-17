
import { heart, minus, plus, star } from "../../icons/SVG";

interface ProductCardSchema {
  name: string;
  description: string;
  price: string;
  rating: number;
  url: string;
  category: string;
  amount: number;
  increment: () => void;
  decrement: () => void;
  addtoCart: (id: string) => void;
  id: string
}

const ProductCard = ({
  name,
  description,
  price,
  rating,
  url,
  amount,
  increment,
  decrement,
  addtoCart,
  id
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
        <p className="text-white backdrop-blur-md w-10 h-10 rounded-lg hover:scale-110 hover:cursor-pointer absolute right-6 top-4 flex justify-center items-center">
          {heart}
        </p>
      </div>

      {/* Details */}
      <div className="w-full  px-4 py-4">
        <div className="flex justify-between">
          <p className="font-extrabold text-lg">{name || "Rice"}</p>

          <div className="flex bg-gray-100 rounded-full justify-between items-center px-4 py-2 gap-6">
            <div
              style={{ borderRadius: "50%" }}
              className={`flex items-center bg-white w-6 justify-center hover:cursor-pointer hover:scale-125 transition-all
    hover:brightness-90 active:brightness-75`}
            >
              <p onClick={decrement}>{minus}</p>
            </div>

            <p>{amount}</p>

            <div
              style={{ borderRadius: "50%" }}
              className={`flex items-center bg-purple-400 text-white w-6 justify-center hover:cursor-pointer hover:scale-125 transition-all
        hover:brightness-90 active:brightness-75`}
            >
              <p onClick={increment}>{plus}</p>
            </div>
          </div>
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
      <div className="w-full px-4 mt-6">
        <button
          onClick={() => addtoCart(id)}
          className="w-full shadow-xl bg-purple-400 text-white font-bold rounded-md py-4 hover:brightness-90 active:brightness-75
            hover:cursor-pointer transition-all "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
