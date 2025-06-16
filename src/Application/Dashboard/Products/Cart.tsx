import Innernav from "../Content/components/Innernav"
import { useAppSelector } from "../../../redux/hooks"
import CartCard from "./components/CartCard";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { newCart } from "../../../redux/Ecommerce/Cart";


const Cart = () => {
    // Get cart
    const dispatch = useAppDispatch()

    const GETcart = async () => {
      try {
        const response = await fetch ("http://localhost:4050/api/cart", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })

        const data = await response.json();
        console.log(data)
        if (!data.newCart){
          console.log(data)
          return;
        }

        dispatch(newCart(data.newCart))
      } catch (error) {
        console.error(error)
      }
    }
    useEffect(() => {
      GETcart();
    }, [dispatch])

    // GET total price

    const cart = useAppSelector(state => state.cartContainer.cart);
    const categories = [ ...new Set(cart.map((item: any) => {
      return item.product?.category
    }))]
   
    const calculateTotal = () => {
      let price = 0;
      for (let item of cart){
        price += parseFloat(item.product?.price || 0) * item.quantity;
      }
      return price.toFixed(2);
    }
  return (
    <>
      <Innernav name={"Jamal"}/>
      {
        cart.length <= 0 ? <div className="min-h-screen flex justify-center items-center">
            <p className="font-extrabold text-4xl text-red-600">OOPS NOTHING TO SEE HERE</p>
        </div> : <div className="flex flex-col">
           <div className="w-full flex flex-col gap-6 px-6 py-8">
            <p className="font-extrabold text-3xl">Cart</p>
            <p className="font-bold">Total Items: {cart.length}</p>
            <p className="font-bold">Total Price: ${calculateTotal()}</p>
            <p className="font-bold">Categories: {categories.join(" , ")}</p>
           </div>
          <div
        className="w-full h-fit gap-10 px-6 py-8 justify-items-center
      grid md:grid-cols-2 midLaptop:grid-cols-2 lg:grid-cols-3"
        >
            {
                cart.map((product: any) => {
                    return <CartCard
                    name={product.product.productName}
                    url={product.product.imageUrl}
                    description={product.product.productDescription}
                    rating={product.product.rating}
                    category={product.product.category}
                    price={product.product.price}
                    id={product.product._id}
                    // removeItem={() => removeItem(product._cartId)}
                    />
                })
            }
      </div>
      </div>
      }
    </>
  )
}

export default Cart