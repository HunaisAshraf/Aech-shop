import React from "react";
import Layout from "../layout/layout";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // delete item
  const removeCartItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //total price

  const totalPrice = () => {
    try {
      let total = 0;
      cart.map((item) => {
        total = total + item.price;
        

      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  //placeOrder
  const handleOrder = async () => {
    try {
      let user = auth.user;
      const res = await axios.post("/api/place-order", { cart, user });
      if(res.data.success){
        toast.success(res.data.message)
        navigate("/dashboard/user")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>{`Hello ${auth.token && auth.user.name}`}</h1>
          <h1>
            {cart.length > 0
              ? `You have ${cart.length} items in your cart ${
                  auth.token ? " " : "please login to checkout"
                }`
              : "please login to checkout"}
          </h1>
        </div>
        <div className="row">
          <div className="col-md-9">
            {cart.map((p) => (
              <div key={p._id} className="row card m-2 p-2 flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/product-photo/${p._id}`}
                    className="card-img-top"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <h5>{p.name}</h5>
                  <p>{p.description.substring(0, 50)}....</p>
                  <h6>Price : ₹ {p.price}</h6>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-3">
            <h2>Cart Summary</h2>
            <p>Checkout</p>
            <hr />
            <h4> Total : ₹ {totalPrice()}</h4>
            <hr />
            {auth.token ? (
              <>
                <div className="mb-3">
                  <h6>Address : {auth.user.address}</h6>
                  <button
                    className="btn btn-warning mt-5"
                    onClick={handleOrder}
                  >
                    Checkout
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/login")}
                >
                  Login To Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
