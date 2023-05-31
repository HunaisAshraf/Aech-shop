import React, { useEffect, useState } from "react";
import Layout from "../../layout/layout";
import AdminMenu from "../../layout/adminMenu";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

  //get category
  const getAllCategory = async () => {
    try {
      const res = await axios.get("/api/get-category")
      if(res.data.success){
          setCategories(res.data.category)
      }
  } catch (error) {
      console.log(error);
  }

  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //add product

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const res = await axios.post("/api/add-product", productData);
      if (res.data.success) {
        toast.success(`${name} added successfully`);
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Product Adding Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Create-Product"}>
      <div className="container-fluid my-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>CreateProduct</h1>
            <div className="w-75 m-1">
              <Select
                className="w-100 mb-3"
                placeholder="Select a category"
                size="large"
                showSearch
                onChange={(value) => setCategory(value)}
              >
                {categories.map((c) => (
                  <Select.Option key={c._id} value={c._id}>
                    {c.name}
                  </Select.Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-secondary col-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      className="img img-responsive"
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  className="form-floating form-control"
                  placeholder="Add Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Add Product Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Add Product Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  className="w-100 mb-3"
                  placeholder="Select Shipping"
                  size="large"
                  onChange={(value) => setShipping(value)}
                >
                  <Select.Option value="0">No</Select.Option>
                  <Select.Option value="1">Yes</Select.Option>
                </Select>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleCreate}
                >
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
