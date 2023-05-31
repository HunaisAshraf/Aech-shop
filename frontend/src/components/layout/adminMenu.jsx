import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center" >
        <div className="list-group">
          <Link to="/dashboard/admin">
            <h3>Admin Panel</h3>
          </Link>
          <Link
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </Link>
          <Link
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </Link>
          <Link
            to="/dashboard/admin/Products"
            className="list-group-item list-group-item-action"
          >
            Products
          </Link>
          <Link
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            User
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
