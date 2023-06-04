import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";
import { MdCalendarViewMonth, MdLocalShipping } from "react-icons/md";
import { TiArrowSync } from "react-icons/ti";
import { IoChatbubblesSharp } from "react-icons/io5";
import { API_URL } from "../../helper/apiUrl";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(46);
  const [second, setSecond] = useState(11);

  const navigate = useNavigate();

  const timer = () => {
    let hr = 1;
    let min = 46;
    var sec = 11;
    setInterval(() => {
      setSecond(sec);
      sec--;
      if (sec < 0) {
        setMinute(min - 1);
        sec = 60;
      }
      if (min < 0) {
        setHour(hr - 1);
        min = 60;
      }
    }, 1000);
  };

  const getProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/get-product?limit=` + 5);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    timer();
  }, []);

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/get-category`);
      if (res.data.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout>
      <div className="home ">
        <div className="banner d-flex flex-wrap py-4 justify-content-evenly">
          <div className="mb-2">
            
          <Link to="all-products">
          <img
              width={630}
              src="/images/laptop.jpg"
              alt="aech"
            />
          </Link>
          </div>
          <div>
            <div className="d-flex flex-wrap align-item-center">
            <Link to="all-products">

              <img
                className="mb-2 ms-2"
                height={360}
                src="/images/mobile.jpg"
                alt=""
              />
            </Link>
            <Link to="all-products">

              <img
                className="mb-2 ms-2"
                height={360}
                src="/images/bluetooth.jpg"
                alt="aech"
              />
            </Link>
            </div>
            <div>
            <Link to="all-products">

              <img
                className="ms-2"
                width={730}
                src="/images/smart.jpg"
                alt=""
              />
            </Link>
            </div>
          </div>
        </div>
        <div className="sales-banner">
          <p className="m-0">
            The Summer Sale <span>60% Off</span> Is Here Ending in{" "}
            <span>{hour} </span>Hours : <span>{minute}</span> Mins :
            <span> {second} </span>Sec
          </p>
        </div>
        <div className="products text-center mt-5">
          <Link to="all-products">
            <div className="product">
              {products.map((product) => (
                <div
                  className="card m-2 pt-2"
                  key={product._id}
                  style={{ width: "14rem" }}
                >
                  <img
                    src={`${API_URL}/api/product-photo/${product._id}`}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title">{product.name}</h6>
                  </div>
                </div>
              ))}
            </div>
          </Link>
        </div>
        <div className="services ">
          <div className="serv ">
            <h1>
              <MdLocalShipping />
            </h1>
            <h3>Free Shipping</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur rerum .
            </p>
          </div>
          <div className="serv">
            <h1>
              <TiArrowSync />
            </h1>
            <h3>Free Return</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur sit amet consectetur rerum .
            </p>
          </div>
          <div className="serv">
            <h1>
              <IoChatbubblesSharp />
            </h1>
            <h3>24/7 Support</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur sit amet consectetur
              adipisicing elit. Aspernatur rerum .
            </p>
          </div>
          <div className="serv">
            <h1>
              <MdCalendarViewMonth />
            </h1>
            <h3>Daily Updates</h3>
            <p>
              Lorem sit amet consectetur ipsum dolor sit amet adipisicing elit.
              Aspernatur .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;

