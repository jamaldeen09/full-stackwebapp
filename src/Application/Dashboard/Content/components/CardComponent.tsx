import { arrow } from "../../icons/SVG";

interface cardProps {
  styles: string;
}

const CardComponent = ({ styles }: cardProps) => {
  return (
    // <div style={{backgroundImage: "url(https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Cheeseburger-3d7c922.jpg?quality=90&resize=556,505)" ,
    //     backgroundPosition: "center",
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover"
    //   }}
    //   className={`w-full rounded-xl shadow-xl hover:scale-105 transition-all flex justify-end flex-col ${styles}
    //    h-80 w-96`}>
    //     <div style={{borderBottom: "none"}}
    //     className="w-full border-t border-white h-12 text-white flex justify-between items-center px-10 hover:brightness-75 hover:cursor-pointer transition-all">
    //        <h1>See more</h1>
    //        <p>{arrow}</p>
    //     </div>
    // </div>

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
      <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-between text-white rounded-xl">
         
      </div>
    </div>
  );
};

export default CardComponent;
