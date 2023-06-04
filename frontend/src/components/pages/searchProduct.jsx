import React from "react";
import Layout from "../layout/layout";
import { useSearch } from "../../context/search";
import { API_URL } from "../../helper/apiUrl";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Result</h1>
          <h6>
            {values.results.length < 1
              ? "No Product Found"
              : `Found ${values.results.length}`}
          </h6>
        </div>
        <div className="d-flex flex-wrap">
            {values.results.map((product) => (
              <div
                className="card m-2 pt-2"
                key={product._id}
                style={{ width: "18rem" }}
              >
                <img
                  src={`${API_URL}/api/product-photo/${product._id}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h6 className="card-title">{product.name}</h6>
                  <p className="card-text">₹ {product.price}</p>
                  <button className="btn btn-primary ms-2">More Details</button>
                  <button className="btn btn-secondary ms-2">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
      </div>
    </Layout>
  );
};

export default Search;
