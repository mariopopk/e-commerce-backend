import { Product } from "../../products";

const DEFAULT_QUERY_OPTIONS = {
  query: null,
  sortBy: null,
  filterBy: null,
  pagination: {
    page: 1,
    pageSize: 10,
  },
};

const ALPHANUMERIC_ASC = "ALPHANUMERIC_ASC";
const ALPHANUMERIC_DESC = "ALPHANUMERIC_DESC";
const NUMERIC_ASC = "NUMERIC_ASC";
const NUMERIC_DESC = "NUMERIC_DESC";

interface ProductQueryOptions {
  query?: string | null;
  sortBy?: ProductSortBy | null;
  filterBy?: ProductFilter | null;
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
}

interface ProductSortBy {
  productProperty: "name" | "price";
  sortType: SortingType;
}

interface ProductFilter {
  size?: string | null;
  fit?: string | null;
  color?: string | null;
  categoryId?: string | null;
}

type SortingType =
  | "ALPHANUMERIC_ASC"
  | "ALPHANUMERIC_DESC"
  | "NUMERIC_ASC"
  | "NUMERIC_DESC";

function sort(sortBy: ProductQueryOptions["sortBy"], products: Product[]) {
  if (!sortBy) return products;
  const { productProperty, sortType } = sortBy;
  switch (productProperty) {
    case "name":
      const [BEFORE, AFTER] = sortType === ALPHANUMERIC_ASC ? [1, -1] : [-1, 1];

      return products.sort((a, b) => {
        const stringA = a[productProperty].toUpperCase();
        const stringB = b[productProperty].toUpperCase();
        if (stringA < stringB) {
          return AFTER;
        }
        if (stringA > stringB) {
          return BEFORE;
        }
        return 0;
      });

    case "price":
      if (sortType === NUMERIC_ASC)
        return products.sort((a, b) => a[productProperty] - b[productProperty]);
      else
        return products.sort((a, b) => b[productProperty] - a[productProperty]);
    default:
      return products;
  }
}

function pagination(
  list: any[],
  { page, pageSize }: ProductQueryOptions["pagination"]
) {
  const pagesCount = Math.ceil(list.length / pageSize);

  console.log(pagesCount);

  //   return list.slice();
}

pagination(["a"], {
  page: 1,
  pageSize: 10,
});

export default (
  parent: any,
  { queryOptions }: { queryOptions: ProductQueryOptions },
  { products }: any
) => {
  const { query, sortBy, filterBy, pagination } = {
    ...DEFAULT_QUERY_OPTIONS,
    ...queryOptions,
  };

  if (!query) return sort(sortBy, products);

  const queryResults = products.filter((product: any) => {
    return product.name
      .toLowerCase()
      .includes(queryOptions?.query?.toLowerCase());
  });

  return sort(sortBy, queryResults);
};
