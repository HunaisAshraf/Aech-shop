import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/productDetails.css";
import { API_URL } from "../../helper/apiUrl";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);

  const params = useParams();

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/single-product/${params.slug}`
      );
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
  }, [params.slug]);
  return (
    <Layout>
      <div className="single-product">
        <div className="prdt-img">
          <img
            src={`${API_URL}/api/product-photo/${product._id}`}
            alt={product.name}
            height={"400px"}
          />
        </div>

        <div className="prdt-details">
          <p className="prdt-title">{product.name}</p>
          <p className="rating">
            {" "}
            <div>
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star" />
              <i className="fas fa-star-half-alt" />
            </div>
          </p>
          <p className="prdt-price">₹ {product.price}</p>
          <p className="prdt-desc">{product.description}</p>
          <button className="btn btn-outline prdt-btn">Add To Cart</button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
