import mongoose from "mongoose";
import clc from "cli-color";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL);
  } catch (error) {}
};

export default connectDB;
