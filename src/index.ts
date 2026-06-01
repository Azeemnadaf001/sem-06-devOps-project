import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { connectDB } from "./db/connection.js";
import { Product } from "./models/Product.js";
import { products as initialProducts } from "./data/products.js";

export const fastify = Fastify({ logger: true });

async function seedDatabase() {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      fastify.log.info("📦 Seeding database with initial products...");
      await Product.insertMany(initialProducts);
      fastify.log.info(`✅ Seeded ${initialProducts.length} products`);
    } else {
      fastify.log.info(`📦 Database already has ${count} products`);
    }
  } catch (error) {
    fastify.log.error({ error }, "❌ Error seeding database");
  }
}

async function start() {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Seed initial data if needed
    await seedDatabase();
    
    // Register CORS
    await fastify.register(cors, { origin: true });

    // Get single product by ID
    fastify.get<{ Params: { id: string } }>(
      "/api/pdp/:id",
      async (request, reply) => {
        const product = await Product.findOne({ id: request.params.id });
        if (!product) {
          reply.code(404);
          return { error: "Product not found" };
        }
        return product;
      }
    );

    // Get all products (home page listing)
    fastify.get("/api/home", async () => {
      const products = await Product.find({}, { id: 1, name: 1, price: 1, image: 1, _id: 0 });
      return products;
    });

    // Get all products with full details
    fastify.get("/api/products", async () => {
      return await Product.find({});
    });

    // Health check
    fastify.get("/health", async () => {
      return { status: "ok", database: "connected" };
    });

    const port = parseInt(process.env.PORT || "3000", 10);
    await fastify.listen({ host: "0.0.0.0", port });
    fastify.log.info(`🚀 Server running on http://0.0.0.0:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
