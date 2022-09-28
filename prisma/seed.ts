import { PrismaClient } from "@prisma/client";
import Category from "../src/resolvers/Category";
import tempCategories from "../src/tempCategories";
import products from "../src/products";

const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.category.deleteMany();
    console.log("Deleted records in category table");

    await prisma.product.deleteMany();
    console.log("Deleted records in product table");

    await prisma.productVariant.deleteMany();
    console.log("Deleted records in product variants table");

    await prisma.category.createMany({
      data: tempCategories,
    });
    console.log("Added category data");

    await prisma.product.createMany({
      data: products.map((product) => {
        const copyProduct = { ...product };
        delete copyProduct.variants;
        return copyProduct;
      }),
    });
    console.log("Added product data");

    products.forEach(async (product) => {
      product?.variants &&
        (await prisma.productVariant.createMany({
          data: product.variants,
        }));
    });

    //   await prisma.product.createMany({
    //     data: products,
    //   });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
