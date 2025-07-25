import express from "express";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB is connect : ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to MongoDb", error);
    process.exit(1); // 1 means
  }
};
