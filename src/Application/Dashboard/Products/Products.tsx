import Innernav from "../Content/components/Innernav";
import CategoryCard from "./components/CategoryCard";
import ProductCard from "./components/ProductCard";
import { categories } from "./utils/categoryInfo";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { newBatch } from "../../../redux/Ecommerce/products";
import { useEffect, useState } from "react";
import { newCart } from "../../../redux/Ecommerce/Cart";
import { useNavigate } from "react-router";

const Products = () => {
  // Important variables
  const selector = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // GET products
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4050/api/products", {
        method: "GET",
      });

      const productData = await response.json();

      if (productData.errors) {
        return;
      } else {
        //
        console.log(productData);
        dispatch(newBatch(productData.products));
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetch data on page reload for persistence
  useEffect(() => {
    fetchProducts();
  }, [dispatch]);

  // Get Data from global state;
  const products = selector.products.products;

  // Conditional Rendering
  const [selectedCategory, setSelectedCategory] = useState("Burgers");

  // Utility function (only if you want to abstract it)
  const handleCategoryClick = (category: string) => {
    if (
      selectedCategory === "Burgers" ||
      selectedCategory === "Pizzas" ||
      selectedCategory === "Fries" ||
      selectedCategory === "Drinks" ||
      selectedCategory === "Desserts" ||
      selectedCategory === "Salads" ||
      selectedCategory === "Wings" ||
      selectedCategory === "Pastas" ||
      selectedCategory === "Tacos"
    ) {
      setAll(false);
    }
    setSelectedCategory(category);
    return category;
  };

  // amount
  const [handleAmount, setHandleAmount] = useState<{ [id: string]: number }>(
    {}
  );
  const [all, setAll] = useState<boolean>(false);

  const incrementAmount = (id: string) => {
    setHandleAmount((prev) =>
      prev[id] === 20
        ? { ...prev, [id]: (prev[id] || 1) + 0 }
        : { ...prev, [id]: (prev[id] || 1) + 1 }
    );
  };

  const decrementAmount = (id: string) => {
    setHandleAmount((prev) =>
      prev[id] === 1
        ? { ...prev, [id]: (prev[id] || 1) - 0 }
        : { ...prev, [id]: (prev[id] || 1) - 1 }
    );
  };
  const token = localStorage.getItem("token");

  const addToCart = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:4050/api/products/cart/${id}?amount=${handleAmount[id]}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!data.cart) {
        console.log(data);
        navigate("/login");
        return;
      }

      alert(`${handleAmount[id]} ${products.find((item: any) => item._id === id).productName}'s has been added to your cart
        `);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  // filtered products
  const filteredProducts = products
    .filter((product: any) => {
      return (
        product.category.toLowerCase() === selectedCategory.toLowerCase().trim()
      );
    })
    .slice(0, 6);

  // GET users information
  
  const information = useAppSelector(state => state.info.information)
  return (
    <>
      <Innernav name={information.username} />
      {/* Categories */}
      <div className="w-full flex flex-col gap-6 py-10">
        <div className="w-full px-6">
          <h1 className="font-extrabold text-2xl">Categories</h1>
        </div>
        <div className="w-full overflow-x-auto h-fit flex justify-between gap-8 py-10 px-6 ">
          {categories.map((category: any) => {
            return (
              <CategoryCard
                key={category.id}
                url={category?.url}
                categoryName={category?.name}
                filterFunc={() => {
                  handleCategoryClick(category?.name);
                }}
                styles={`
                          ${`${
                            all
                              ? ""
                              : selectedCategory === category.name
                              ? "active"
                              : ""
                          }`}`}
              />
            );
          })}
          <div
            onClick={() => setAll(true)}
            className={`w-full min-w-44 md:min-w-44 midIpad:min-w-44 lg:min-w-40 rounded-2xl flex flex-col gap-3 border border-purple-500 justify-center items-center px-4 py-4
      hover:scale-105 hover:bg-purple-500 hover:text-white active:brightness-75 transition-all hover:cursor-pointer duration-300
      ${all ? "bg-purple-500 text-white" : "backdrop-blur-lg bg-purple-500/5"}`}
          >
            See All
          </div>
        </div>
      </div>

      {/* Product Card Section */}
      {products.length <= 0 ? (
        <div className="flex justify-center items-center h-96">
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
        <div
          className="w-full h-fit gap-10 px-6 py-8 justify-items-center
      grid md:grid-cols-2 midLaptop:grid-cols-2 lg:grid-cols-3"
        >
          {all
            ? products.map((product: any) => {
                return (
                  <ProductCard
                    key={product.productName}
                    name={product.productName}
                    url={product.imageUrl}
                    description={product.productDescription}
                    rating={product.rating}
                    category={product.category}
                    price={product.price}
                    id={product._id}
                    amount={handleAmount[product._id] || 1}
                    increment={() => incrementAmount(product._id)}
                    decrement={() => decrementAmount(product._id)}
                    addtoCart={() => addToCart(product._id)}
                  />
                );
              })
            : filteredProducts.map((product: any) => {
                return (
                  <ProductCard
                    key={product._id}
                    name={product.productName}
                    url={product.imageUrl}
                    description={product.productDescription}
                    rating={product.rating}
                    category={product.category}
                    price={product.price}
                    id={product._id}
                    amount={handleAmount[product._id] || 1}
                    increment={() => incrementAmount(product._id)}
                    decrement={() => decrementAmount(product._id)}
                    addtoCart={() => addToCart(product._id)}
                  />
                );
              })}
        </div>
      )}
    </>
  );
};

export default Products;
