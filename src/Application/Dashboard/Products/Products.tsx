import Innernav from "../Content/components/Innernav"
import CategoryCard from "./components/CategoryCard"
import ProductCard from "./components/ProductCard"
import { categories, categorySchema } from "./utils/categoryInfo"


const Products = () => {
  return (
    <>
    <Innernav name="Jamal"/>
    {/* Categories */}
    <div 
    className="w-full flex flex-col gap-6 py-10">
        <div className="w-full px-6">
          <h1 className="font-extrabold text-2xl">Categories</h1>
        </div>
        <div className="w-full overflow-x-auto h-fit flex justify-between gap-8 py-10 px-6 ">
           {
            categories.map((category: categorySchema) => {
              return <CategoryCard url={category?.url} categoryName={category?.name}/>
            })
           }
            <div 
      className="w-full min-w-44 md:min-w-44 midIpad:min-w-44 lg:min-w-40 rounded-2xl flex flex-col gap-3 border border-purple-500 justify-center items-center px-4 py-4
      hover:scale-105 hover:bg-purple-500 hover:text-white active:brightness-75 transition-all hover:cursor-pointer duration-300
      backdrop-blur-lg bg-purple-500/5">
        See All
      </div>
        </div>
    </div>

    {/* Product Card Section */}
    <div className="w-full h-fit gap-10 px-6 py-8 justify-items-center
    grid md:grid-cols-2 midLaptop:grid-cols-2 lg:grid-cols-3">

      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
    </>

  )
}

export default Products