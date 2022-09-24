export default (parent: any, args: any, { products }: any) => {
  const productId = parent.id;

  return products.find((product: any) => {
    return product.id === productId;
  })?.variants;
};
