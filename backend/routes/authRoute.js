import express from "express";
import {
  registerController,
  loginController,
  testController,
  getOrderController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//register

router.post("/register", registerController);

//login||post
router.post("/login", loginController);

//test
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});



//orders
router.get("/orders", requireSignIn, getOrderController);

export default router;
