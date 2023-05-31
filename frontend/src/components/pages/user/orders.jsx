import React, { useState, useEffect } from "react";
import Layout from "../../layout/layout";
import UserMenu from "../../layout/userMenu";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth.token) {
      getOrders();
    }
  }, [auth.token]);
  return (
    <Layout title={"Your - Orders"}>
      <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>orders</h1>
            {orders.map((o, i) => {
              return (
                <div className="border shadow mb-3">
                  <table className="table" >
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o.status}</td>
                        <td>{moment(o.createdAt).fromNow()}</td>
                        <td>{o.payment.success ? "Success" : "Failed"}</td>
                        <td>{o.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                    <div className="container">
                      {o.products.map((p) => (
                        <div key={p._id} className="row border-none card m-2 p-2 flex-row">
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
                            <h6>Price : ₹ {p.price.toLocaleString("hi-IN")}</h6>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
