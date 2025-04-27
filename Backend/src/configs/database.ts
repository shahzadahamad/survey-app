import mongoose from "mongoose"
import dotenv from 'dotenv';

const connectDatabase = async (): Promise<void> => {
  try {
    dotenv.config();
    await mongoose.connect(process.env.MONGO_URL!);
    console.log('Database Connected....');
  } catch (error) {
    console.log("Error connecting to mongodb...  :" + error);
    process.exit(1);
  }
}

export default connectDatabase;