
import CardComponent from "./components/CardComponent"
import Innernav from "./components/Innernav"
import PromoCard from "./components/PromoCard"


const Content = () => {
  return (
    <div 
      className="w-full h-full col-span-12 flex flex-col gap-4 pb-2"
    >

      <Innernav name="Jamal"/>
      {/* Small Card Display Section */}
      <div className="w-full flex justify-between gap-10 items-center pt-10
         px-10
         sm:px-0
         iphone:px-10
         flex-col
         
         ">
          <div className="w-full font-bold text-2xl 
          flex iphone:justify-center
          justify-center
          sm:justify-start
          sm:px-10">
          Favourites
         </div>
        
         <div className="w-full justify-between gap-10 items-center  py-6
          iphone:px-2
          sm:px-10
          flex-col
          sm:flex-row
          flex sm:overflow-x-auto">
            <CardComponent />
            <CardComponent />
            <CardComponent />
         </div>
      </div>

      {/* Featured section */}
      <div className="w-full flex  gap-10 pt-20 flex-col ">
         <div className="w-full font-bold text-2xl 
          flex iphone:justify-center
          justify-center
          sm:justify-start
          sm:px-10">
          Featured
         </div>
         <div className="w-full justify-between gap-10 items-center py-6
          iphone:px-2
          sm:px-10
          flex-col
          sm:flex-row
          flex overflow-x-auto">
           <PromoCard />
           <PromoCard />
           <PromoCard />
         </div>
      </div>

      <div className="w-full px-5 pt-10">
        {/* Big card */}
      <div className="w-full h-44 bg-purple-500 rounded-xl flex justify-between  text-white px-10 shadow-xl hover:scale-[1.01] transition-all
      flex-col items-start py-6 iphone:py-8
      sm:flex-row sm:items-center sm:py-0">
        <div>
          <h1 className="text-2xl font-bold">Hungry for More?</h1>
          <p className="text-sm">Get 25% off your first order!</p>
        </div>
          <button className="bg-white text-purple-500 font-bold px-6 py-2 rounded-xl hover:bg-gray-100">Order Now</button>
        </div>
      </div>
      </div>
  )
}

export default Content