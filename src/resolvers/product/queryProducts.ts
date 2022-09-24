export default (parent: any, args: any, { products }: any) => {
  if (!args.query) return null;
  return products.filter((product: any) => {
    return product.name.toLowerCase().includes(args.query.toLowerCase());
  });
};
