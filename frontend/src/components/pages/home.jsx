import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";
import { MdCalendarViewMonth, MdLocalShipping } from "react-icons/md";
import { TiArrowSync } from "react-icons/ti";
import { IoChatbubblesSharp } from "react-icons/io5";

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
      const res = await axios.get("/api/get-product?limit=" + 5);
      setProducts(res.data.products);
      console.log(res.data.products);
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
      const res = await axios.get("/api/get-category");
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
            <img
              width={630}
              src="https://scontent.fcjb5-1.fna.fbcdn.net/v/t1.6435-9/124863753_4769601339749109_7669238375257339666_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=973b4a&_nc_ohc=ipxQZnWaX1gAX_jxHHD&_nc_ht=scontent.fcjb5-1.fna&oh=00_AfBgL_d1yc_KuqjR1Y9kpjH9EkVVkp3YymS7ZfGOB_xOqA&oe=649C0517"
              alt="aech"
            />
          </div>
          <div>
            <div className="d-flex flex-wrap align-item-center">
              <img
                className="mb-2 ms-2"
                height={360}
                src="https://pbs.twimg.com/media/EQzTuNaXsAEbFEK.jpg"
                alt=""
              />
              <img
                className="mb-2 ms-2"
                height={360}
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/131_Shot_4.3.png?v=1684917048"
                alt="aech"
              />
            </div>
            <div>
              <img
                className="ms-2"
                width={730}
                src="https://helix-watches.com/media/weltpixel/owlcarouselslider/images/m/e/metal_fit_banner_11zon_1_1_.jpg"
                alt=""
              />
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
                    src={`/api/product-photo/${product._id}`}
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

// <Layout title={"All-products"}>
//   <div className="container-fluid row m-2 ">
//     <div className="col-md-2 mt-3">

//       <h4>Filter by category</h4>
//       <div className="d-flex flex-column">
//         {categories.map((c) => (
//           <Checkbox
//             className="ms-2"
//             key={c._id}
//             onChange={(e) => handleFilter(e.target.checked, c._id)}
//           >
//             {c.name}
//           </Checkbox>
//         ))}
//       </div>

//       <h4 className="mt-4">Filter by Price</h4>
//       <div className="d-flex flex-column">
//         <Radio.Group
//           className="ms-2"
//           onChange={(e) => setRadio(e.target.value)}
//         >
//           {prices.map((p) => (
//             <div key={p._id}>
//               <Radio value={p.array}>{p.name}</Radio>
//             </div>
//           ))}
//         </Radio.Group>
//       </div>
//       <div className="mt-4 ms-4">
//         <button
//           className="btn btn-outline-danger"
//           onClick={() => window.location.reload()}
//         >
//           Reset Filter
//         </button>
//       </div>
//     </div>
//     <div className="col-md-10">
//       <h1 className="text-center">All products</h1>
//       <div className="d-flex flex-wrap">
//         {products.map((product) => (
//           <div
//             className="card m-2 pt-2"
//             key={product._id}
//             style={{ width: "18rem" }}
//           >
//             <img
//               src={`/api/product-photo/${product._id}`}
//               className="card-img-top"
//               alt="..."
//             />
//             <div className="card-body">
//               <h6 className="card-title">{product.name}</h6>
//               <p className="card-text">₹ {product.price}</p>
//               <button
//                 className="btn btn-primary ms-2"
//                 onClick={() => navigate(`/product/${product.slug}`)}
//               >
//                 More Details
//               </button>
//               <button
//                 className="btn btn-secondary ms-2"
//                 onClick={() => {
//                   setCart([...cart, product]);
//                   localStorage.setItem(
//                     "cart",
//                     JSON.stringify([...cart, product])
//                   );
//                   toast.success("Item Added To Cart");
//                 }}
//               >
//                 Add to cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// </Layout>
