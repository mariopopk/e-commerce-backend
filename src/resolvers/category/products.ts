export default (parent: any, args: any, { products }: any) => {
  const categoryId = parent.id;
  const parentId = parent.parentId;

  if (parentId === null) return products;

  return products.filter((product: any) => {
    return product.categoryId === categoryId;
  });
};
