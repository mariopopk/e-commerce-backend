import { PrismaClient } from "@prisma/client";
import tempCategories from "../src/tempCategories";
import products, { ProductOption, ProductVariant } from "../src/products";

const prisma = new PrismaClient();

const productData = products;

const load = async () => {
  try {
    await prisma.category.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.productOptions.deleteMany();
    await prisma.product.deleteMany();
    // Category
    await prisma.category.createMany({
      data: tempCategories,
    });

    // Product
    await prisma.product.createMany({
      data: productData.map((product) => {
        const copyProduct = { ...product };
        delete copyProduct.variants;
        delete copyProduct.options;
        return copyProduct;
      }),
    });

    // Product Variant
    const variants: ProductVariant[] = productData.flatMap((product) => {
      return product.variants!;
    });
    await prisma.productVariant.createMany({
      data: variants,
    });

    // Product Option
    const options: ProductOption[] = productData.flatMap((product) => {
      return product.options!;
    });
    await prisma.productOptions.createMany({
      data: options,
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
