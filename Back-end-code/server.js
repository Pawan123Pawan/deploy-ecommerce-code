import express from "express";
import dotenv from "dotenv";
import clc from "cli-color";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// configure env
dotenv.config();
//port
const PORT = process.env.PORT || 8080;

// db connection
connectDB();

// rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api
app.get("/", (req, res) => {
  return res.send("welcome to the new server");
});

//listen on port

app.listen(PORT, () => {
  console.log(clc.yellowBright(`listening server on port ${PORT}`));
});
