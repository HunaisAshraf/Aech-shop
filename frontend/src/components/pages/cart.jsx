import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //total price

  const totalPrice = () => {
    try {
      let total = 0;
      cart.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("hi-IN");
    } catch (error) {
      console.log(error);
    }
  };

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

  //placeOrder


  //get payment token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/braintree/token`);
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth.token]);

  //handle Paymentt
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user");
      toast.success("Payment Success");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="text-center py-4">
          <h3>Your Cart</h3>
        </div>
        <div className="row">
          <div className="col-md-9">
            {cart.map((p) => (
              <div key={p._id} className="row card m-2 p-2 flex-row">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/product-photo/${p._id}`}
                    className="card-img-top"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <h5>{p.name}</h5>
                  <p>{p.description.substring(0, 50)}....</p>
                  <h6>Price : ₹ {p.price.toLocaleString("hi-IN")}</h6>
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
          <div className="summary col-md-3">
            <h2>Cart Summary</h2>
            <h6>
              {cart.length > 0
                ? `You have ${cart.length} items in your cart ${
                    auth.token ? " " : "please login to checkout"
                  }`
                : "please login to checkout"}
            </h6>
            <p>Checkout</p>
            <hr />
            <h4> Total : ₹ {totalPrice()}</h4>
            <hr />
            {auth.token ? (
              <>
                <div className="mb-3 text-center">
                  <h6>Address : {auth.user.address}</h6>
                  
                </div>
              </>
            ) : (
              <div className="mb-3  text-center">
                <button
                  className="btn btn-warning w-75"
                  onClick={() => navigate("/login")}
                >
                  Login To Checkout
                </button>
              </div>
            )}
            <div className="my-4  text-center">
              {!clientToken || !cart.length || !auth.token ? (
               null
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "valut",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary w-75"
                    onClick={handlePayment}
                    disabled={loading || !instance || auth.user.addresss}
                  >
                    {loading ? "Processing..." : "Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
