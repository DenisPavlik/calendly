import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
  isConnected = true;
}