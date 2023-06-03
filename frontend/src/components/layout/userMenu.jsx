import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center ">
        <div className="list-group">
          <Link to="/dashboard/user">
            <h3>Profile</h3>
          </Link>
          <Link
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Edit Profile
          </Link>
          <Link
            to="/dashboard/user/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
