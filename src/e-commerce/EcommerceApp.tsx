import NavBar from "../components/NavBar"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import ProductCard from "./ProductCard"
import { useEffect } from "react"
import { updateStore } from "../redux/Product/products"
import { newProduct } from "../redux/Product/singleProduct"
import { useNavigate } from "react-router"
import { setAccDetails } from "../redux/Auth/accountDetails";



const ECommerceApp = () => {
    // Important 
    const dispatch = useAppDispatch()
    const selector = useAppSelector(state => state);
    const navigate = useNavigate();

    // State management
    const productsStorage = selector.productStore.products
    
    // GET products
    const GETproducts = async () => {
        try {
            const response = await fetch("http://localhost:4080/api/products", {
                method: "GET",
                credentials: "include"
            })
            const data = await response.json();

            if (!data.products){
                return
            }

            dispatch(updateStore(data.products))
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
      const fetchSingleUser = async () => {
        try { 
          const response = await fetch("http://localhost:4080/api/single-user", {
            method: "GET",
            credentials: "include"
          })

          const data = await response.json()
          if (!data.userInformation) {
            return;
          }

          dispatch(setAccDetails(data.userInformation))
        } catch (err) {
          console.error(err)
        }
      }

      fetchSingleUser()
      GETproducts()
    }, [dispatch])

    // GET SINGLE PRODUCT
    const GETsingleproduct = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:4080/api/single-product/${id.toString()}`, {
                method: "GET",
                credentials: "include"
            })
            const data = await response.json();
            if(!data.product){

              return;
            }
            dispatch(newProduct(data.product));
            navigate("/productPage")
        } catch (err) {
            console.error(err)
        }
    }
  return (
    <>
      <NavBar />
       
       {/* Main Application */}
        <div 
         className="min-h-screen py-20 flex flex-col gap-10"
        >
            <div
              className="w-full h-fit flex flex-col justify-center items-center gap-8"
            >
              <img 
                src="https://img.freepik.com/premium-vector/online-shop-e-commerce-logo_1199645-37307.jpg?semt=ais_hybrid&w=740" 
                alt="Logo"
                className="rounded-full w-14 h-14 md:w-16 md:h-16"
              />

              {/* Main Title */}
              <div 
                className="w-fit flex flex-col gap-3 items-center justify-center text-white text-center"
              >
                <div className="w-full">
                    <h1 className="text-3xl sm:text-4xl">Our Signature Dishes</h1>
                </div>

                <div className="w-full text-center px-10">
                    <p className="text-sm leading-8
        
                    sm:text-sm sm:leading-8
                    md:text-lg md:leading-8">
                        From classic favourites to modern culinary creations, our menu is designed to tantalize <br />your taste buds.
                        Every dish is made with the freshest ingredients and an extra fash of love.
                    </p>
                </div>
              </div>
            </div>

             {/* Product Card Section */}
            <div 
              className="w-full min-h-96 grid gap-16 py-10 grid-cols-1 px-8 justify-items-center
              sm:px-24
              md:grid-cols-2 md:px-10
              smallTablet:grid-cols-1
              midLaptop:grid-cols-2
              lg:grid-cols-3  lg:px-20"
            >
                {
                    productsStorage.length > 0 ? productsStorage.map((product: any) => {
                        return <ProductCard 
                          key={product.id}
                          name={product.name} 
                          imageUrl={product.imageUrl} 
                          description={product.description}
                          price={product.price}
                          theme={product.theme}
                          id={product.id}
                          btnColor={product.btnColor}
                          cardFunc={() => GETsingleproduct(product.id)}
                        />
                    }) : <div className="flex justify-center items-center min-h-screen text-white font-bold text-4xl  w-full"> 
                          <h1>Loading...</h1>
                    </div>
                }
            </div>
       </div>
    </>
  )
}

export default ECommerceApp