import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Contact from "./components/pages/contact";
import Policy from "./components/pages/policy";
import PageNotFound from "./components/pages/pagenotfound";
import Register from "./components/pages/register";
import Login from "./components/pages/login";
import UserDashboard from "./components/pages/user/userDashboard";
import PrivateRoute from "./components/routes/private";
import AdminDashboard from "./components/pages/admin/adminDashboard";
import AdminRoute from "./components/routes/adminRoute";
import CreateCategory from "./components/pages/admin/createCategory";
import CreateProduct from "./components/pages/admin/createProduct";
import Users from "./components/pages/admin/users";
import Products from "./components/pages/admin/products";
import UpdateProduct from "./components/pages/admin/updateProduct";
import AllProducts from "./components/pages/allProducts";
import Search from "./components/pages/searchProduct";
import ProductDetails from "./components/pages/productDetails";
import Cart from "./components/pages/cart";
import AdminOrders from "./components/pages/admin/adminOrders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
