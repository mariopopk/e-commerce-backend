import tempCategories from "./tempCategories";
import tempProducts from "./tempProducts";

const products = tempProducts.map((product) => {
  return {
    id: product.data.id,
    name: product.value,
    slug: product.data.url,
    imageUrl: product.data.image_url,
    hoverImageUrl: product.data.hover_image_url,
    price: product.data.full_price,
    description: product.data.description,
    variants: product.data.swatches.map((variant) => {
      return {
        id: Math.random() * 100 + Date.now(),
        productId: product.data.id,
        colorName: variant.color_name,
        price: variant.current_price,
        imageUrl: variant.primary_image_url,
        hoverImageUrl: variant.hover_image_url,
        swatchImageUrl: variant.swatch_image_url,
      };
    }),
  };
});

export const resolvers = {
  Query: {
    searchProducts: (parent: any, args: any, context: any) => {
      if (!args.query) return null;
      return (
        products.filter((product) => {
          return product.name.toLowerCase().includes(args.query.toLowerCase());
        }) || []
      );
    },
    products: () =>
      tempProducts.map((product) => {
        return {
          id: product.data.id,
          name: product.value,
        };
      }),
    categories: () => tempCategories,
    // TODO: Replace type any
    category: (parent: any, args: any, context: any) =>
      tempCategories.find((category) => {
        return category.id === args.id;
      }),
  },

  Category: {
    products: (arent: any, args: any, context: any) => {},
  },
};
