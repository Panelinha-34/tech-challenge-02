import { FastifyInstance } from "fastify";

import { ClientRoutes } from "../routes/ClientRoutes";
import { ComboRoutes } from "../routes/ComboRoutes";
import { HealhCheckRoutes } from "../routes/HealhCheckRoutes";
import { OrderNotificationRoutes } from "../routes/OrderNotificationRoutes";
import { OrderRoutes } from "../routes/OrderRoutes";
import { ProductRoutes } from "../routes/ProductRoutes";

export function routes(app: FastifyInstance) {
  app.register(HealhCheckRoutes);

  app.register(ClientRoutes, { prefix: "/clients" });
  app.register(ComboRoutes, { prefix: "/combos" });
  app.register(ProductRoutes, { prefix: "/products" });
  app.register(OrderRoutes, { prefix: "/orders" });
  app.register(OrderNotificationRoutes, { prefix: "/order-notifications" });
}
