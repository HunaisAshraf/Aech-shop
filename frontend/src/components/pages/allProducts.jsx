import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { prices } from "../prices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCart } from "../../context/cart";
import "../../styles/allProducts.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [cart, setCart] = useCart([]);

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/get-product`);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/get-category`);
      if (res.data.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllCategory();
    }
  }, [checked.length, radio.length]);

  //filter
  const handleFilter = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    console.log(checked);
  };

  //get filtered products
  const filteredProducts = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/product-filters`, { checked, radio });
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) {
      filteredProducts();
    }
    //eslint-disable-next-line
  }, [checked, radio]);
  return (
    <Layout title={"All-products"}>
      <div className="product-page container-fluid row">
        <div className="filter col-md-2 mt-3">
          <h1 className="text-center bd-btm" >FILTERS</h1>

          {/* category filter */}

          <h4 className="bd-btm">Filter by category</h4>
          <div className="d-flex flex-column">
            {categories.map((c) => (
              <Checkbox
                className="m-1"
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* price filter */}

          <h4 className=" bd-btm mt-4">Filter by Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group
              className="m-1"
              onChange={(e) => setRadio(e.target.value)}
            >
              {prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="mt-4 ms-4">
            <button
              className="btn btn-outline-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
        </div>
        <div className="list col-md-10">
          <h1 className="text-center">All products</h1>
          <div className="d-flex flex-wrap">
            {products.map((product) => (
              <div
                className="card m-2 pt-2"
                key={product._id}
                style={{ width: "18rem" }}
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/product-photo/${product._id}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h6 className="card-title">{product.name}</h6>
                  <p className="card-text">₹ {(product.price).toLocaleString('hi-IN')}</p>
                  <button
                    className="btn btn-detail ms-2"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      // handleCart(product);
                      setCart([...cart, product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, product])
                      );
                      toast.success("Item Added To Cart");
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;

