import { arrow } from "../../icons/SVG";

interface cardProps {
  url: string;
  name: string;
  route: () => void
}

const CardComponent = ({ url,name,route }: cardProps) => {
  return (
   
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
      <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-between text-white rounded-xl">
      <div className="w-full">
        <h1 className="font-extrabold text-2xl">{name}</h1>
      </div>
      <div onClick={route}
        style={{borderBottom: "none"}}
        className="
        w-full border-t border-white h-12 text-white flex justify-between items-center px-10 hover:brightness-75 hover:cursor-pointer transition-all">
           <h1>See more</h1>
           <p>{arrow}</p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
