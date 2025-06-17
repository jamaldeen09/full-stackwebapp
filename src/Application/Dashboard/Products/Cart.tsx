import Innernav from "../Content/components/Innernav";
import { useAppSelector } from "../../../redux/hooks";
import CartCard from "./components/CartCard";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { newCart } from "../../../redux/Ecommerce/Cart";

const Cart = () => {
  // Get cart
  const dispatch = useAppDispatch();

  const GETcart = async () => {
    try {
      const response = await fetch("http://localhost:4050/api/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      console.log(data);
      if (!data.newCart) {
        console.log(data);
        return;
      }

      dispatch(newCart(data.newCart));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    GETcart();
  }, []);

  // GET total price

  const cart = useAppSelector((state) => state.cartContainer.cart);

  const categories = [
    ...new Set(
      cart.map((item: any) => {
        return item.product?.category;
      })
    ),
  ];

  const calculateTotal = () => {
    let price = 0;
    for (let item of cart) {
      price += parseFloat(item.product?.price || 0) * item.quantity;
    }
    return price.toFixed(2);
  };

  const handleLength = () => {
    let allItems = 0;
    cart.map((product: any) => {
      allItems += product.quantity;
    });
    return allItems;
  };

  // Remove item
  // we get the _id of the clicked item from our cart
  // after getting the id when delete is clicked we -1 from the quantity of that item

  // GET users information

  const information = useAppSelector(state => state.info.information)

  const DeleteCartItem = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:4050/api/deleteItem/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      alert("Successfully Deleted")
      GETcart();
    } catch (err) {
      console.error(err);
    }
  };

  // Clearing cart
  const handleCartClearing = async () => {
    try {
      const response = await fetch ("http://localhost:4050/api/clear-cart", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })

      const data = await response.json()
      alert("Cart Cleared Successfully")
      GETcart()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <Innernav name={information.username} />

      {cart.length <= 0 ? (
        <div className="flex justify-center items-center min-h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 py-10">
          <div className="w-full px-6 py-8 flex flex-col gap-6 font-extrabold text-xl items-start">
            <h1>Total Items: {handleLength()}</h1>
            <h2>Total Price: ${calculateTotal()}</h2>
            <h3>Categories: {categories.map((res: any) => res).join(" , ")}</h3>
            <button onClick={handleCartClearing}
            className="px-4 py-3 rounded-md shadow-xl hover:cursor-pointer hover:-translate-y-1 transition-all
            hover:brightness-90 active:brightness-75 bg-purple-400 text-white font-extrabold duration-300">
                 Clear Cart
            </button>
          </div>
          
          <div
            className="w-full h-fit gap-10 px-6 py-8 justify-items-center 
      grid md:grid-cols-2 midLaptop:grid-cols-2 lg:grid-cols-3"
          >
            {cart.map((product: any) => {
              return Array.from({ length: product.quantity }).map((_, i) => (
                <CartCard
                  key={`${product.product._id}-${i}`}
                  name={product.product.productName}
                  url={product.product.imageUrl}
                  description={product.product.productDescription}
                  rating={product.product.rating}
                  category={product.product.category}
                  price={product.product.price}
                  id={product.product._id}
                  removeItem={() => DeleteCartItem(product.product._id)}
                />
              ));
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
