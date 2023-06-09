import React, { useState } from "react";
import Layout from "../layout/layout";
import "../../styles/register.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../helper/apiUrl";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, SetPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, SetPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/register`, {
        name,
        email,
        phone,
        address,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  return (
    <Layout title={"Sign-in"}>
      <div className="register">
        <div className=" register-form">
          <form className="forms w-100" onSubmit={handleSubmit}>
            <h1 className="text-center">Register</h1>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                type="Text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputName"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputNumber" className="form-label">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => SetPhone(e.target.value)}
                className="form-control"
                id="exampleInputNumber"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Address
              </label>
              <input
                type="Text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                id="exampleInputAddress"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btns w-75">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
