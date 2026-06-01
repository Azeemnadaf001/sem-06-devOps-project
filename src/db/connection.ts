import mongoose from "mongoose";
import { fastify } from "../index.js";

export async function connectDB() {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce";
    
    await mongoose.connect(mongoUri);
    fastify.log.info("✅ MongoDB connected successfully");
    
    return mongoose.connection;
  } catch (error) {
    fastify.log.error({ error }, "❌ MongoDB connection failed");
    process.exit(1);
  }
}

export default mongoose;
