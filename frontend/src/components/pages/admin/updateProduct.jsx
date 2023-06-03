import React, { useEffect, useState } from "react";
import Layout from "../../layout/layout";
import { Select } from "antd";
import AdminMenu from "../../layout/adminMenu";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  //get single product
  const getSingleProduct = async () => {
    try {
      const res = await axios.get(`/api/single-product/${params.slug}`);
      setName(res.data.product.name);
      setId(res.data.product._id);
      setDescription(res.data.product.description);
      setPrice(res.data.product.price);
      setQuantity(res.data.product.quantity);
      setShipping(res.data.product.shipping);
      setCategory(res.data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

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

  //update product

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const res = await axios.put(`/api/update-product/${id}`, productData);
      if (res.data.success) {
        toast.success(`${name} Updates successfully`);
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Product Updating Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete product

  const handleDelete = async()=>{
    try {
        const res = await axios.delete(`/api/delete-product/${id}`)
        if(res.data.success){
            toast.success("Product Seleted Successfully")
            navigate("/dashboard/admin/products")
        }else{
            toast.error("Product deleting failed")
        }
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Layout>
      <div className="container-fluid my
      -3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="w-75 m-1">
              <Select
                className="w-100 mb-3"
                placeholder="Select a category"
                size="large"
                showSearch
                onChange={(value) => setCategory(value)}
                value={category.name}
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
                {photo ? (
                  <div className="text-center">
                    <img
                      className="img img-responsive"
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      className="img img-responsive"
                      src={`/api/product-photo/${id}`}
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
                  value={shipping ? "Yes" : "No"}
                >
                  <Select.Option value="0">No</Select.Option>
                  <Select.Option value="1">Yes</Select.Option>
                </Select>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-outline-primary"
                  type="submit"
                  onClick={handleUpdate}
                >
                  UPDATE PRODUCT
                </button>
                <button
                  className="btn btn-outline-danger ms-3"
                  type="submit"
                  onClick={handleDelete}
                >
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
