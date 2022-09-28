import { Context } from "../..";

interface CategoriesArgs {}

interface CategoryArgs {
  id: string;
}

interface ProductsArgs {
  queryOptions: ProductQueryOptions;
}

interface ProductQueryOptions {
  query?: string | null;
  sortBy?: ProductSortBy | null;
  filterBy?: ProductFilter | null;
  pagination?: Pagination | null;
}

interface ProductSortBy {
  productProperty: string;
  sortType: string;
}

interface ProductFilter {
  size: string;
  fit: string;
  color: string;
  categoryId: string;
}

interface Pagination {
  page: number;
  pageSize: number;
}

interface ProductArgs {
  id: string;
}

export default {
  async categories(parent: null, args: CategoriesArgs, { prisma }: Context) {
    return await prisma.category.findMany({
      where: {
        parentCategory: {
          is: null,
        },
      },
      include: {
        subcategories: true,
      },
    });
  },
  async category(parent: null, { id }: CategoryArgs, { prisma }: Context) {
    return await prisma.category.findUnique({
      where: { id },
      include: {
        subcategories: true,
        parentCategory: true,
      },
    });
  },
  async products(
    parent: null,
    { queryOptions }: ProductsArgs,
    { prisma }: Context
  ) {
    return await prisma.product.findMany({
      where: {
        name: {
          contains: queryOptions?.query ?? undefined,
          mode: "insensitive",
        },
      },
      //   include: {
      //     category: true,
      //     productVariant: true,
      //   },
    });
  },

  async product(parent: null, { id }: ProductArgs, { prisma }: Context) {
    return await prisma.product.findUnique({
      where: {
        id,
      },
      //   include: {
      //     category: true,
      //     productVariant: true,
      //   },
    });
  },
};
