import React, { useEffect, useState } from "react";
import Layout from "../../layout/layout";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import moment from "moment";
import "../../../styles/userProfile.css"

const UserDashboard = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const res = await axios.get("/api/orders");
      console.log(res.data);

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard"}>
      <div className="container-fluid mt-3 p-3">
        <div className="m-4">
          <h1>Profile</h1>
          <div className="mb-3 ps-5">
            <h5>Name : {auth.user.name}</h5>
            <h5>Email : {auth.user.email}</h5>
            <h5>Contact : {auth.user.phone}</h5>
            <h5>Address : {auth.user.address}</h5>
          </div>
          <h1 className="mt-4 ">Orders</h1>
          <div>
            {orders.map((o, i) => {
              return (
                <div className="border shadow mb-3">
                  <table className="table">
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
                  <div className="container d-flex p-2">
                    {o.products.map((p) => (
                      <div key={p._id} className="me-3 border shadow p-4">
                        <div>
                          <img
                            src={`/api/product-photo/${p._id}`}
                            className="card-img-top"
                            alt="..."
                          />
                          <h5>{p.name}</h5>
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

export default UserDashboard;
