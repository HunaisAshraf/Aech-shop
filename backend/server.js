import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import ProductRoutes from "./routes/productRoute.js";
import cors from "cors";

//configure env
dotenv.config();

const app = express();

//databse config
connectDb();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", ProductRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server running mode on port ${port}`);
});
