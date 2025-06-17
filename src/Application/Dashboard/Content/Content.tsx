import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import CardComponent from "./components/CardComponent";
import Innernav from "./components/Innernav";
import PromoCard from "./components/PromoCard";
import { useEffect, useState } from "react";
import { newInfo } from "../../../redux/Auth/InfoSlice";
import { useNavigate } from "react-router";

const Content = () => {
  // GET users information
  const information = useAppSelector(state => state.info.information)
  const dispatch = useAppDispatch()
  const GETuserinfo = async () => {
    try {
      const response = await fetch("http://localhost:4050/api/user-info", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      dispatch(newInfo(data.information))
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await GETuserinfo();
      await GETfeaturedAndFavourites();
    };
    fetchData();
  }, []);

  const GETfeaturedAndFavourites = async () => {
    try {
      const response = await fetch ("http://localhost:4050/api/featured/favourites", {
        method: "GET",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`}
      })

      const data = await response.json();
      setFeatured(data.featuredProducts)
      setFanFavourites(data.favouriteProducts)
    } catch (error) {
      console.error(error)
    }
  }

  const [ featured,setFeatured ] = useState<any>([])
  const [ fanFavourites,setFanFavourites ] = useState<any>([]);
  const navigate = useNavigate()

  const addToCart = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:4050/api/products/cart/${id}?amount=1`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      if (!data.cart) {
        console.log(data);
        navigate("/login");
        return;
      }

      alert(`Added`)
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full h-full col-span-12 flex flex-col gap-4 pb-2">
      <Innernav name={information.username || "Loading..."}/>
      {/* Small Card Display Section */}
      <div
        className="w-full flex justify-between gap-10 items-center pt-10
         px-10
         sm:px-0
         iphone:px-10
         flex-col
         
         "
      >
        <div
          className="w-full font-bold text-2xl 
          flex iphone:justify-center
          justify-center
          sm:justify-start
          sm:px-10"
        >
          Favourites
        </div>

        <div
          className="w-full justify-between gap-10 items-center  py-6
          iphone:px-2
          sm:px-10
          flex-col
          sm:flex-row
          flex sm:overflow-x-auto"
        >
           {
            fanFavourites.length <= 0 ? <div className="flex justify-center items-center px-6">
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
         </div> : fanFavourites.map((item: any) => {
              return <CardComponent key={item._id}
              url={item.imageUrl} name={item.productName} route={() => navigate("/dashboard/products")}/>
            })
           }
        </div>
      </div>

      {/* Featured section */}
      <div className="w-full flex  gap-10 pt-20 flex-col ">
        <div
          className="w-full font-bold text-2xl 
          flex iphone:justify-center
          justify-center
          sm:justify-start
          sm:px-10"
        >
          Featured
        </div>
        <div
          className="w-full justify-between gap-10 items-center py-6
          iphone:px-2
          sm:px-0
          flex-col
          sm:flex-row 
          flex overflow-x-auto"
        >
          {
          featured.length <= 0 ? <div className="flex justify-center items-center px-20">
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
            </div> :<div
          className="w-full justify-between gap-10 items-center  py-6
          iphone:px-2
          sm:px-10
          flex-col
          sm:flex-row
          flex sm:overflow-x-auto"
        >
           {
            featured.map((item: any) => {
              return <PromoCard 
                  url={item.imageUrl}
                  productName={item.productName}
                  rating={item.rating}
                  price={item.price}
                  id={item._id}
                  key={item._id}
                  addCart={() => addToCart(item._id)}
               />
            })
           }
        </div>
             
            
          }
        </div>
      </div>

      <div className="w-full px-5 pt-10">
        {/* Big card */}
        <div
          className="w-full h-44 bg-purple-500 rounded-xl flex justify-between  text-white px-10 shadow-xl hover:scale-[1.01] transition-all
      flex-col items-start py-6 iphone:py-8
      sm:flex-row sm:items-center sm:py-0"
        >
          <div>
            <h1 className="text-2xl font-bold">Hungry for More?</h1>
            <p className="text-sm">Get 25% off your first order!</p>
          </div>
          <button className="bg-white text-purple-500 font-bold px-6 py-2 rounded-xl hover:bg-gray-100">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
