import { useAppDispatch, useAppSelector } from "../redux/hooks"
import NavBar from "../components/NavBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const SingleProduct = () => {
    const singleProduct = useAppSelector(state => state.product.singleProduct)

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
  return (
    <>
      <NavBar />
      <div 
        className="min-h-screen flex items-center justify-between px-20 gap-20"
      >
        
        {/* Image Area */}
        <div className="w-1/2 flex flex-col gap-4">
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
        <div className="w-1/2 h-fit text-white flex gap-16 flex-col">
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
      </div>
    </>
  )
}

export default SingleProduct