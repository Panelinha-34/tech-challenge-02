import { FastifyInstance } from "fastify";

export async function HealhCheckRoutes(app: FastifyInstance) {
  app.get("/health-start", async () => ({ status: "ok" }));
  app.get("/health-read", async () => ({ status: "ok" }));
  app.get("/health-live", async () => ({ status: "ok" }));
}
