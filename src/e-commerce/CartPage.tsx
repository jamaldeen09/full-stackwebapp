import NavBar from "/Users/macbook/cookie-auth-app/src/components/NavBar"
import { useAppSelector } from "../redux/hooks"
import ProductCard from "./ProductCard"

const CartPage = () => {
    const usersCart = useAppSelector(state => state.account.cart)
  return (
    <>
      <NavBar />
      {usersCart.length > 0 ? <div 
       className="w-full min-h-96 grid gap-16 py-10 grid-cols-1 px-8 justify-items-center
       sm:px-24
       md:grid-cols-2 md:px-10
       smallTablet:grid-cols-1
       midLaptop:grid-cols-2
       lg:grid-cols-3  lg:px-20">
           {
            usersCart.map(product => {
                return  <ProductCard 
                key={product.id}
                name={product.name} 
                imageUrl={product.imageUrl} 
                description={product.description}
                price={product.price}
                theme={product.theme}
                id={product.id}
                btnColor={product.btnColor}
                cardFunc={() => console.log()}
              />
            })
           }
      </div> : <div className="flex justify-center items-center min-h-screen">
           <h1 className="text-5xl font-extrabold text-red-500">
              OOPS NOTHING TO SEE HERE
           </h1>
        </div>}
    </>
  )
}

export default CartPage