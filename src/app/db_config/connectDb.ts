import mongoose from "mongoose";

export async function connectToDb() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      console.log(`No mongodb connection url found`);
    }
    const connectionInstance = await mongoose.connect(MONGODB_URI!);
    console.log(`Connected db successfully`);
    mongoose.connection.on("error", () => {
      console.log(`DB connection error`);
      process.exit(1);
    });
  } catch (error) {
    console.log(`Error while connecting DB `, error);
  }
}
