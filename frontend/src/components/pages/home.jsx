import React from "react";
import Layout from "../layout/layout";
import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  // const [auth, setAuth] = useAuth();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      let response = await fetch("https://fakestoreapi.com/products/2");
      let resData = await response.json();
      setProducts(resData);
    };
    fetchData();
  }, []);

  return (
    <Layout title={"Aech-Shop"}>
      {/* <h1>Homepage</h1>
      <div className="product">
        <div className="card" style={{ width: "18rem" }}>
          <img src={products.image} className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-text">{products.title}</p>
            <p className="card-text">{products.price}</p> */}
            {/* <p>{products.rating.e}</p> */}
            {/* <p className="card-text">{products.rating}</p> */}
          {/* </div>
        </div>
      </div> */}
      {/* <pre>{JSON.stringify(auth, null, 5)}</pre> */}
    </Layout>
  );
};

export default Home;
