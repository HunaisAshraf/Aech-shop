import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  addProductController,
  deleteProductController,
  getPhotoController,
  getProductController,
  getSingleProductController,
  placeOrderController,
  productFilterController,
  searchproductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//add product
router.post(
  "/add-product",
  requireSignIn,
  isAdmin,
  formidable(),
  addProductController
);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get all product
router.get("/get-product", getProductController);

//single product
router.get("/single-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", getPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//filter prouct
router.post("/product-filters", productFilterController);

//search product
router.get("/search/:keyword", searchproductController);

//makeorder
router.post("/place-order", requireSignIn, placeOrderController);

export default router;
