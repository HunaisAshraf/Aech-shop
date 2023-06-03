import React, { useState, useEffect } from "react";
import Layout from "../../layout/layout";
import AdminMenu from "../../layout/adminMenu";
import axios from "axios";
import moment from "moment";
import { useAuth } from "../../../context/auth";
import { Select } from "antd";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "canceled",
  ]);
  const [changeStatus, setChangeStatus] = useState([]);
  const [auth, setAuth] = useAuth();

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("/api/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth.token) getAllOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/update-orders/${orderId}`, {
        status: value,
      });
      getAllOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Manage-orders"}>
      <div className="container-fluid my-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders.map((o, i) => {
              return (
                <div className="border shadow mb-3">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o.status}
                          >
                            {status.map((s, i) => (
                              <Select.Option key={i} value={s}>
                                {s}
                              </Select.Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o.buyer.name}</td>
                        <td>{moment(o.createdAt).fromNow()}</td>
                        <td>{o.payment.success ? "Success" : "Failed"}</td>
                        <td>{o.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o.products.map((p) => (
                      <div
                        key={p._id}
                        className="row border-none card m-2 p-2 flex-row"
                      >
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

export default AdminOrders;
