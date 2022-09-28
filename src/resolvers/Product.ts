import { Context } from "../..";

interface ProductParentProperties {
  id: string;
  categoryId: string;
}

export default {
  async category(
    parent: ProductParentProperties,
    args: null,
    { prisma }: Context
  ) {
    return await prisma.category.findUnique({
      where: {
        id: parent.categoryId,
      },
    });
  },
  async variants(
    parent: ProductParentProperties,
    args: null,
    { prisma }: Context
  ) {
    return await prisma.productVariant.findUnique({
      where: {
        id: parent.id,
      },
    });
  },
};
