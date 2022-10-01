import { Context } from "../..";

const productSortTypes = new Set(["asc", "desc"]);
const productSortableProperties = new Set(["price", "name"]);

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
  productProperty: "price" | "name";
  sortType: "asc" | "desc";
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
    const isSortablePropertyValid =
      queryOptions?.sortBy &&
      productSortableProperties.has(queryOptions?.sortBy?.productProperty);

    const isSortableTypeValid =
      queryOptions?.sortBy &&
      productSortTypes.has(queryOptions.sortBy.sortType);

    return await prisma.product.findMany({
      where: {
        name: {
          contains: queryOptions?.query ?? undefined,
          mode: "insensitive",
        },
        ...(queryOptions?.filterBy?.categoryId && {
          OR: [
            {
              categoryId: queryOptions?.filterBy?.categoryId,
            },

            {
              category: {
                parentId: queryOptions?.filterBy?.categoryId,
              },
            },
          ],
        }),
      },
      orderBy: {
        [isSortablePropertyValid
          ? queryOptions?.sortBy?.productProperty!
          : "name"]: isSortableTypeValid
          ? queryOptions?.sortBy?.sortType!
          : "asc",
      },
      skip:
        ((queryOptions?.pagination?.page || 1) - 1) *
        (queryOptions?.pagination?.pageSize || 10),
      take: queryOptions?.pagination?.pageSize || 10,
    });
  },

  async product(parent: null, { id }: ProductArgs, { prisma }: Context) {
    return await prisma.product.findUnique({
      where: {
        id,
      },
    });
  },
};
