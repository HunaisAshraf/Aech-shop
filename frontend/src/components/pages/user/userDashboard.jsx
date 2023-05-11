import React, { useEffect, useState } from "react";
import Layout from "../../layout/layout";
import { useAuth } from "../../../context/auth";
import axios from "axios";

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
      <div className="container-fluid m-3 p-3">
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
          {orders?.map((o, i) => {
              return (
                
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`/api/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}...</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
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
