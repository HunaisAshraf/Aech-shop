import React, { useEffect, useState } from "react";
import Layout from "../../layout/layout";
import AdminMenu from "../../layout/adminMenu";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/get-users`
      );
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/delete-users/${id}`
      );
      getUser()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Manage-Users"}>
      <div className="container-fluid mt-3 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center my-3">All users</h1>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr>
                    {u.role === 0 ? (
                      <>
                        <td>{u.name}</td>
                        <td>{u.address}</td>
                        <td>{u.phone}</td>
                        <td>{u.email}</td>
                        <td>
                          <button className="btn btn-danger" onClick={()=>handleDelete(u._id)}>Remove</button>
                        </td>
                      </>
                    ) : (
                      ""
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
