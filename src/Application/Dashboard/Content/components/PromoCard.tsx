import ScrollFadeIn from "../../../../Animations/CardAnim";
import { plus, star } from "../../icons/SVG";

interface PromoCardSchema {
  url: string;
  productName: string;
  price: string;
  rating: string;
}

const PromoCard = () => {
  return (
    <ScrollFadeIn>
      <div
  className="relative rounded-xl overflow-hidden shadow-lg bg-cover bg-center hover:-translate-y-2 transition-all duration-300
  w-full min-w-[28rem]
  iphone:min-w-[20rem]
  realSmall:min-w-[18rem]
  sm:w-full sm:min-w-[30rem] h-96"
  style={{
    backgroundImage: `url(https://img.freepik.com/free-photo/top-view-hamburger-plate_23-2148263001.jpg)`,
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-between text-white
  px-6 sm:px-10 md:px-10 lg:px-6 rounded-xl">
    <div>
      <h3 className="text-sm uppercase text-orange-300">
        🔥 Today’s Special
      </h3>
      <h1 className="text-2xl sm:text-3xl font-bold mt-1">Double Stack Burger</h1>
    </div>

    <div className="flex justify-between items-center mt-4 text-sm sm:text-base">
      <p>⭐⭐⭐⭐⭐ 4.8</p>
      <p className="text-lg font-bold">$12.99</p>
    </div>

    <button className="mt-4 bg-white text-black py-2 px-4 rounded-md w-fit hover:bg-orange-300 text-sm sm:text-base">
      Add to Cart
    </button>
  </div>
</div>
    </ScrollFadeIn>
  );
};

export default PromoCard;
