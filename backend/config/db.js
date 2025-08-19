import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://janadajayathilaka123:Im7pk3ohIj07gfK1@cluster0.hyp74ny.mongodb.net/"
    )
    .then(() => {
      console.log("MongoDB connected successfully");
    });
};
