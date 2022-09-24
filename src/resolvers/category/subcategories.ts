export default (parent: any, args: any, { categories }: any) => {
  const parentId = parent.id;
  return categories.filter((category: any) => {
    return category.parentId === parentId;
  });
};
