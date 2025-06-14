
import CardComponent from "./components/CardComponent"
import Innernav from "./components/Innernav"


const Content = () => {
  return (
    <div 
      className="w-full h-full col-span-12 flex flex-col gap-10"
    >

      {/* Navbar */}
      <Innernav title="Dashboard"/>

      {/* Small Card Display Section */}
      <div className="w-full px-10 flex justify-between gap-10 items-center
      flex-col
      md:flex-row">

         <CardComponent />
         <CardComponent />
         <CardComponent/>
      </div>
    </div>
  )
}

export default Content