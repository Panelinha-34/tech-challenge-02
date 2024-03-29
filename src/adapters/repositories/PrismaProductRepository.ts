import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Product } from "@/core/domain/entities/Product";
import { Category } from "@/core/domain/valueObjects/Category";
import { IProductRepository } from "@/core/interfaces/repositories/IProductRepository";
import { prisma } from "@/drivers/db/prisma/config/prisma";

import { PrismaProductToDomainConverter } from "./converters/PrismaProductToDomainConverter";

export class PrismaProductRepository implements IProductRepository {
  async findMany(
    { page, size }: PaginationParams,
    includeInactive: boolean,
    category?: Category
  ): Promise<PaginationResponse<Product>> {
    const where = {
      category: category ? category.name : undefined,
      active: includeInactive ? undefined : true,
    };

    const totalItems = await prisma.product.count({
      where,
    });
    const totalPages = Math.ceil(totalItems / size);

    const data = await prisma.product.findMany({
      where,
      take: size,
      skip: (page - 1) * size,
    });

    return new PaginationResponse<Product>({
      data: data.map((c) => PrismaProductToDomainConverter.convert(c)),
      totalItems,
      currentPage: page,
      pageSize: size,
      totalPages,
    });
  }

  async findByName(name: string): Promise<Product | null> {
    return prisma.product
      .findFirst({
        where: {
          name,
        },
      })
      .then((product) =>
        product ? PrismaProductToDomainConverter.convert(product) : null
      );
  }

  async findByIdAndCategory(
    id: string,
    category: Category
  ): Promise<Product | null> {
    return prisma.product
      .findFirst({
        where: {
          id,
          category: category.name,
        },
      })
      .then((product) =>
        product ? PrismaProductToDomainConverter.convert(product) : null
      );
  }

  async findManyByIds(ids: string[]): Promise<Product[]> {
    return prisma.product
      .findMany({
        where: {
          id: {
            in: ids,
          },
        },
      })
      .then((products) =>
        products.map((c) => PrismaProductToDomainConverter.convert(c))
      );
  }

  async findById(id: string): Promise<Product | null> {
    return prisma.product
      .findUnique({
        where: {
          id,
        },
      })
      .then((product) =>
        product ? PrismaProductToDomainConverter.convert(product) : null
      );
  }

  async create(product: Product): Promise<Product> {
    return prisma.product
      .create({
        data: {
          name: product.name,
          description: product.description,
          active: product.active,
          price: product.price,
          category: product.category.name,
        },
      })
      .then((c) => PrismaProductToDomainConverter.convert(c));
  }

  async update(product: Product): Promise<Product> {
    return prisma.product
      .update({
        where: {
          id: product.id.toString(),
        },
        data: {
          name: product.name,
          description: product.description,
          active: product.active,
          price: product.price,
          category: product.category.name,
        },
      })
      .then((c) => PrismaProductToDomainConverter.convert(c));
  }
}
