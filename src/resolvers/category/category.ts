export default (parent: any, args: any, { categories }: any) =>
  categories.find((category: any) => {
    return category.id === args.id;
  });
