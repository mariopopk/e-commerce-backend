import tempCategories from "./tempCategories";
import products from "./products";

export const resolvers = {
  Query: {
    searchProducts: (parent: any, args: any, context: any) => {
      if (!args.query) return null;
      return products.filter((product) => {
        return product.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    products: () => products,
    product: (parent: any, args: any, context: any) =>
      products.find((product) => {
        return product.id === args.id;
      }),
    categories: () => tempCategories,

    // TODO: Replace type any
    category: (parent: any, args: any, context: any) =>
      tempCategories.find((category) => {
        return category.id === args.id;
      }),
  },

  Category: {
    subcategories: (parent: any, args: any, context: any) => {
      const parentId = parent.id;
      return tempCategories.filter((category) => {
        return category.parentId === parentId;
      });
    },

    products: (parent: any, args: any, context: any) => {
      const categoryId = parent.id;
      return products.filter((product) => {
        return product.categoryId === categoryId;
      });
    },
  },

  Product: {
    variants: (parent: any, args: any, context: any) => {
      const productId = parent.id;

      return products.find((product) => {
        return product.id === productId;
      })?.variants;
    },
  },
};
