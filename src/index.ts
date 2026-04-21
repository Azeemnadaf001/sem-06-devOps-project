import Fastify from "fastify";
import cors from "@fastify/cors";
import { products, type Product } from "./data/products.js";

const fastify = Fastify({ logger: true });

async function start() {
  await fastify.register(cors, { origin: true });

  fastify.get<{ Params: { id: string } }>("/api/pdp/:id", async (request, reply) => {
    const product = products.find((p) => p.id === request.params.id);
    if (!product) {
      reply.code(404);
      return { error: "Product not found" };
    }
    return product;
  });

  fastify.get("/api/home", async () => {
    return products.map(({ id, name, price, image }) => ({
      id,
      name,
      price,
      image,
    }));
  });

  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();