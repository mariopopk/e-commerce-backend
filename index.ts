import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import path from "path";
import products from "./src/resolvers/product/products";
import product from "./src/resolvers/product/product";
import categories from "./src/resolvers/category/categories";
import category from "./src/resolvers/category/category";
import subcategories from "./src/resolvers/category/subcategories";
import productVariants from "./src/resolvers/product/productVariants";
import tempCategories from "./src/tempCategories";
import tempProducts from "./src/products/index";

const typeDefs = readFileSync(
  path.join(__dirname, "./src/schema.graphql")
).toString("utf-8");

const server = new ApolloServer({
  typeDefs,
  context: {
    categories: tempCategories,
    products: tempProducts,
  },
  resolvers: {
    Query: {
      // queryProducts,
      products,
      product,
      categories,
      category,
    },
    Category: {
      subcategories,
      products,
    },
    Product: {
      variants: productVariants,
    },
  },
  csrfPrevention: true,
  cache: "bounded",
  /**
   * For production environments, use
   * ApolloServerPluginLandingPageProductionDefault instead.
   **/
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
