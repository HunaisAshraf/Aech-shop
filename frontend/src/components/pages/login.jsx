import React, { useState } from "react";
import Layout from "../layout/layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import "../../styles/login.css";
import { API_URL } from "../../helper/apiUrl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  return (
    <Layout title={"login"}>
      <div className="login">
        <div className="login-form">
          <form className="w-100" onSubmit={handleSubmit}>
            <h1 className="text-center">Sign In</h1>
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

export default Login;
