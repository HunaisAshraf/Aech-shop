import React from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/layout";

const PageNotFound = () => {
  return (
    <Layout title={"Page Not Found"}>
      <div className=" pnf text-center pt-5">
        <h1 className="pnf-title" style={{fontSize:"100px"}}>404</h1>
        <h1>Oops! Page Not Found</h1>
        <Link to = "/" className="pnf-btn btn btn-outline-dark ">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
