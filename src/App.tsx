import Mainpage from "./Application/Mainpage"
import { Routes, Route } from 'react-router-dom';
import Signup from "./Authentication/Signup/Signup";
import Login from "./Authentication/Login/Login";
import Dashboard from "./Application/Dashboard/Dashboard";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import Content from "./Application/Dashboard/Content/Content";
import Products from "./Application/Dashboard/Products/Products";
import Cart from "./Application/Dashboard/Products/Cart";

const App = () => {
  return (

    <Routes>
      <Route path="/" element={<Mainpage />}>
        <Route index element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>}>
      
        <Route index element={<Content />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="chatbot" element={""} />
          <Route path="profile" element={""} />
        </Route>
      <Route path="*" element={""}/>
    </Routes>
  )
}

export default App