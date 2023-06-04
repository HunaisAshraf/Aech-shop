import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../pages/spinner";
import { API_URL } from "../../helper/apiUrl";

export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
  
    useEffect(() => {
      const authCheck = async () => {
        const res = await axios.get(`${API_URL}/api/admin-auth`);
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      }
      if (auth?.token) authCheck();
    }, [auth?.token]);
  
    return ok ? <Outlet /> : <Spinner />;
    
  }
