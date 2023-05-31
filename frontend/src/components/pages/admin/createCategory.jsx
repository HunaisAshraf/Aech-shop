import React, { useEffect, useState } from "react";
import Layout from "../../layout/layout";
import AdminMenu from "../../layout/adminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../form/categoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState("");

  //add category
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("/api/create-category", { name })
      .then((res) => {
        if (res.data.success) {
          toast.success(`${res.data.category.name} created`);
          getAllCategory();
        } else {
          toast.error("something went wrong in creating category");
        }
      })
      .catch((error) => console.log(error));
  };

  //all category
  const getAllCategory = async () => {
    await axios
      .get("/api/get-category")
      .then((res) => {
        setCategories(res.data.category);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios
      .put(`/api/update-category/${selected}`, { name: updatedName })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          getAllCategory();
        } else {
          toast.error("something went wrong in updating category");
        }
      })
      .catch((error) => console.log(error));
  };

  //delete category

  const handleDelete = async (id) => {
    await axios
      .delete(`/api/delete-category/${id}`)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          getAllCategory();
        } else {
          toast.error("something went wrong in deleting category");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Layout title={"create-category"}>
      <div className="container-fluid my-3 p-3" style={{borderLeft: "2px solid #c5cbf4"}}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage category</h1>
            <div className="p-3 mb-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            <div>
              <table className="table w-75">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <>
                      <tr>
                        <td key={category._id}>{category.name}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setIsModalOpen(true);
                              setUpdatedName(category.name);
                              setSelected(category._id);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => handleDelete(category._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              title="Basic Modal"
              open={isModalOpen}
              footer={null}
              onCancel={() => setIsModalOpen(false)}
            >
              <CategoryForm
                handleSubmit={handleUpdate}
                value={updatedName}
                setValue={setUpdatedName}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
