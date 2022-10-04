import { Prisma } from "@prisma/client";
import { Context } from "../..";

const productSortTypes = new Set(["asc", "desc"]);
const productSortableProperties = new Set(["price", "name"]);

interface CategoriesArgs {}

interface CategoryArgs {
  id: string;
}

interface ProductsArgs {
  query?: string | null;
  sort?: ProductSortBy | null;
  filter?: ProductFilter | null;
  pagination?: Pagination | null;
}

interface ProductSortBy {
  property: "price" | "name";
  order: "asc" | "desc";
}

interface ProductFilter {
  size: string;
  fit: string;
  color: string;
  categoryId: string;
}

interface Pagination {
  skip: number;
  take: number;
}

interface ProductArgs {
  id: string;
}

export default {
  async categories(_parent: null, args: CategoriesArgs, { prisma }: Context) {
    return await prisma.category.findMany({
      where: {
        parentCategory: {
          is: null,
        },
      },
    });
  },
  async category(_parent: null, { id }: CategoryArgs, { prisma }: Context) {
    return await prisma.category.findUnique({
      where: { id },
      include: {
        subcategories: true,
        parentCategory: true,
      },
    });
  },
  async products(
    _parent: null,
    { query, sort, pagination, filter }: ProductsArgs,
    { prisma }: Context
  ) {
    const isSortablePropertyValid =
      sort && productSortableProperties.has(sort.property);

    const isSortableTypeValid = sort && productSortTypes.has(sort.order);

    const skip = pagination?.skip ?? 0;
    const take = pagination?.take ?? 12;

    const where: Prisma.ProductWhereInput = {
      name: {
        contains: query ?? undefined,
        mode: "insensitive",
      },
      purchasable: true,
      ...(filter?.categoryId && {
        OR: [
          {
            categoryId: filter?.categoryId,
          },

          {
            category: {
              parentId: filter?.categoryId,
            },
          },
        ],
      }),
    };

    const list = await prisma.product.findMany({
      skip,
      take,
      where,
      orderBy: {
        [isSortablePropertyValid ? sort?.property : "name"]: isSortableTypeValid
          ? sort?.order
          : "asc",
      },
    });

    const total = await prisma.product.count({
      where,
    });

    return {
      list,
      total,
      skip,
      take,
    };
  },

  async product(_parent: null, { id }: ProductArgs, { prisma }: Context) {
    return await prisma.product.findUnique({
      where: {
        id,
      },
    });
  },
};
