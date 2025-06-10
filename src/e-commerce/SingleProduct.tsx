import { useAppDispatch, useAppSelector } from "../redux/hooks"
import NavBar from "../components/NavBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useNavigate } from "react-router"
import { addItem } from "../redux/Cart/addedItem"

const SingleProduct = () => {
    const singleProduct = useAppSelector(state => state.product.singleProduct)
    const usersId = useAppSelector(state => state.account)
    const storeItemToAdd = useAppSelector(state => state.addedItem.item)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // state management for picture display
    const [ mainPic,setMainPic ] = useState<boolean>(false);
    const [ secondPic,setSecondPic ] = useState<boolean>(false);
    const [ thirdPic,setThirdPic ] = useState<boolean>(false);

    // Functions to show
    const showMain = () => {
        setMainPic(true)
        setSecondPic(false)
        setThirdPic(false);
    }

    const showSecond = () => {
        setMainPic(false)
        setSecondPic(true)
        setThirdPic(false);
    }

    const showThird = () => {
        setMainPic(false)
        setSecondPic(false)
        setThirdPic(true);
    }

    // add to cart
    const addingToCart = async () => {
      try {
         const response = await fetch ("http://localhost:4080/api/api/add-to-cart" ,{
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({ itemId: singleProduct.id, userId: usersId.id }),
            credentials: "include"
         })

         const data = await response.json();

         if (!data.addedItem) {
            return;
         }

         dispatch(addItem(data.addedItem));
      } catch (err) {
         console.error(err)
      }
    }

    if (!singleProduct){
      return (
         <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-5xl font-bold text-orange-500">OOPS NOTHINGS HERE...</h1>
         </div>
      )
    }
  return (
    <>
      <NavBar />

      {!singleProduct ? navigate("/"): 
      <div 
        className="min-h-screen flex items-center justify-between px-10 gap-20 flex-col py-20
        md:px-16
        lg:flex-row lg:px-20"
      >
        
        {/* Image Area */}
        <div className="w-full flex flex-col gap-4">
            <img src={mainPic ? singleProduct.imageUrl : secondPic ? singleProduct.displayPics[0] : thirdPic ? singleProduct.displayPics[1] : singleProduct.imageUrl} alt={singleProduct.name} className="rounded-3xl"/>
            <div className="w-full flex justify-center items-center gap-4">
               <img onClick={showMain}
               src={singleProduct.imageUrl} alt={singleProduct.name} className="rounded-full w-14 h-12 hover:scale-105 hover:brightness-90 active:brightness-75 transition-all hover:cursor-pointer"/>
               <img onClick={showSecond}
               src={singleProduct.displayPics[0]} alt="" className="rounded-full w-14 h-12 hover:scale-105 hover:brightness-90 active:brightness-75 transition-all hover:cursor-pointer"/>
               <img onClick={showThird}
               src={singleProduct.displayPics[1]} alt="" className="rounded-full w-14 h-12 hover:scale-105 hover:brightness-90 active:brightness-75 transition-all hover:cursor-pointer"/>
            </div>
        </div>

        {/* Product Details */}
        <div className="w-full h-fit text-white flex gap-16 flex-col">
           <div className="flex gap-6 flex-col">
                <h1 className="text-4xl font-extrabold">{singleProduct.name}</h1>
                <div className="w-full flex gap-2">
                 <FontAwesomeIcon icon={faStar} className="text-yellow-500"/>
                 <FontAwesomeIcon icon={faStar} className="text-yellow-500"/>
                 <FontAwesomeIcon icon={faStar} className="text-yellow-500"/>
                 <FontAwesomeIcon icon={faStar} className="text-yellow-500"/>
                 <FontAwesomeIcon icon={faStar} className=""/>
                </div>
           </div>

           <div className="w-full">
              <h1 className="leading-8">{singleProduct.description}</h1>
           </div>

           <div className="w-full flex gap-40 border-b py-2">
              <p className="text-xl font-bold">Price</p>
              <p className="text-xl font-bold">{singleProduct.price}</p>
           </div>

           <div className="w-full flex ">
              <button style={{backgroundColor: singleProduct.btnColor}}
              className="w-full py-3 rounded-lg hover:brightness-90 active:brightness-75">
                 Add to Cart
              </button>
           </div>
        </div>
      </div>} 
    </>
  )
}

export default SingleProduct