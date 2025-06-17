import ScrollFadeIn from "../../../../Animations/CardAnim";


interface PromoCardSchema {
  url: string;
  productName: string;
  price: string;
  rating: string;
  addCart: (id: string) => void;
  id: string
}

const PromoCard = ({ url, productName, price, rating, addCart, id}: PromoCardSchema) => {
  return (
    <ScrollFadeIn>
      <div
  className="relative rounded-xl overflow-hidden shadow-lg bg-cover bg-center hover:-translate-y-2 transition-all duration-300
  w-full min-w-[28rem]
  iphone:min-w-[20rem]
  realSmall:min-w-[18rem]
  sm:w-full sm:min-w-[30rem] h-96"
  style={{
    backgroundImage: `url(${url})`,
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-between text-white
  px-6 sm:px-10 md:px-10 lg:px-6 rounded-xl">
    <div>
      <h3 className="text-sm uppercase text-orange-300">
        🔥 Today’s Special
      </h3>
      <h1 className="text-2xl sm:text-3xl font-bold mt-1">{productName}</h1>
    </div>

    <div className="flex justify-between items-center mt-4 text-sm sm:text-base">
      <p>⭐⭐⭐⭐⭐ {rating}</p>
      <p className="text-lg font-bold">${price}</p>
    </div>

    <button onClick={() => addCart(id)}
    className="mt-4 bg-white text-black py-2 px-4 rounded-md w-fit hover:bg-orange-300 text-sm sm:text-base">
      Add to Cart
    </button>
  </div>
</div>
    </ScrollFadeIn>
  );
};

export default PromoCard;
