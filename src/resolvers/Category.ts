import { Context } from "../..";

interface CategoryParentProperties {
  id: string;
  name: string;
  slug: string;
  parentId: string;
}

export default {
  async subcategories(
    parent: CategoryParentProperties,
    args: null,
    { prisma }: Context
  ) {
    return await prisma.category.findMany({
      where: {
        parentId: parent.id,
      },
    });
  },
  async parentCategory(
    parent: CategoryParentProperties,
    args: null,
    { prisma }: Context
  ) {
    if (parent.parentId) {
      return await prisma.category.findUnique({
        where: {
          id: parent.parentId,
        },
      });
    } else return null;
  },
  async products(
    parent: CategoryParentProperties,
    args: null,
    { prisma }: Context
  ) {
    const isMainCategory = parent?.parentId === null;
    if (isMainCategory) {
      return await prisma.product.findMany({
        where: {
          category: {
            parentId: parent.id,
          },
        },
      });
    } else {
      return await prisma.product.findMany({
        where: {
          categoryId: parent.id,
        },
      });
    }
  },
};
