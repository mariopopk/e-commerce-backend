export default (parent: any, args: any, { products }: any) =>
  products.find((product: any) => {
    return product.id === args.id;
  });
