import React, { useEffect, useState } from "react";
import Layout from "../../layout/layout";
import AdminMenu from "../../layout/adminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all product
  const getProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/get-product`);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/dashboard/admin/product/${product.slug}`}
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img 
                      src={`${process.env.REACT_APP_API}/api/product-photo/${product._id}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{(product.description).substring(0,60,)}...</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
