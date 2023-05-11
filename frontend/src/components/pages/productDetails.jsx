import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);

  const params = useParams();

  const getProduct = async () => {
    try {
      const res = await axios.get(`/api/single-product/${params.slug}`);
      if (res.data.success) {
        setProduct(res.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  },[params?.slug]);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-4 text-center pt-4">
          <img
            src={`/api/product-photo/${product._id}`}
            // className="card-img-top"
            alt={product.name}
            height={"400px"}
          />
        </div>
        <div className="col-md-8">
          <h1 className="text-center">Product Details</h1>
          <h6>name:{product.name}</h6>
          <h6>Description:{product.description}</h6>
          <h6>Price:{product.price}</h6>
          
        </div>
      </div>
      <div className="row"></div>
    </Layout>
  );
};

export default ProductDetails;
