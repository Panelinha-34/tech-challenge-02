import { FastifyInstance } from "fastify";

import { ProductController } from "@/adapters/controllers/product/ProductController";
import { createProductDocSchema } from "@/adapters/controllers/product/schema/CreateProductSchema";
import { editProductDocSchema } from "@/adapters/controllers/product/schema/EditProductSchema";
import { getProductByIdDocSchema } from "@/adapters/controllers/product/schema/GetProductByIdSchema";
import { getProductsDocSchema } from "@/adapters/controllers/product/schema/GetProductsSchema";
import { inactiveProductDocSchema } from "@/adapters/controllers/product/schema/InactiveProducSchema";
import { CreateProductPresenter } from "@/adapters/presenters/product/CreateProductPresenter";
import { EditProductPresenter } from "@/adapters/presenters/product/EditProductPresenter";
import { GetProductByIdPresenter } from "@/adapters/presenters/product/GetProductByIdPresenter";
import { GetProductsPresenter } from "@/adapters/presenters/product/GetProductsPresenter";
import { InactivateProductPresenter } from "@/adapters/presenters/product/InactivateProductPresenter";
import { makeProductRepository } from "@/adapters/repositories/PrismaRepositoryFactory";
import { ProductUseCase } from "@/core/useCases/product/ProductUseCase";

export async function ProductRoutes(app: FastifyInstance) {
  const productController = new ProductController(
    new ProductUseCase(makeProductRepository()),

    new GetProductsPresenter(),
    new GetProductByIdPresenter(),
    new CreateProductPresenter(),
    new EditProductPresenter(),
    new InactivateProductPresenter()
  );

  app.get("", {
    schema: getProductsDocSchema,
    handler: productController.getProducts.bind(productController),
  });
  app.get("/:id", {
    schema: getProductByIdDocSchema,
    handler: productController.getProductById.bind(productController),
  });
  app.post("", {
    schema: createProductDocSchema,
    handler: productController.createProduct.bind(productController),
  });
  app.put("/:id", {
    schema: editProductDocSchema,
    handler: productController.editProduct.bind(productController),
  });
  app.delete("/:id", {
    schema: inactiveProductDocSchema,
    handler: productController.inactivateProduct.bind(productController),
  });
}
