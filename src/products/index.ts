import newProducts from "./new";

interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  description: string;
  purchasable: boolean;
  variants: ProductVariant[] | undefined;
}

interface ProductVariant {
  id: string;
  productId: string;
  colorName: string;
  price: number;
  imageUrl: string;
  hoverImageUrl: string;
  swatchImageUrl: string;
}

const products: Product[] = newProducts.map((product) => {
  const purchasable =
    product?.data?.swatches
      ?.map((swatch) => {
        return swatch.purchasable;
      })
      .reduce((previousValue, purchasable) => {
        if (previousValue || purchasable) return true;
        else return !!previousValue;
      }, false) || false;

  return {
    id: product.data.id,
    categoryId: product.categoryId,
    name: product.value,
    slug: product.data.url,
    imageUrl: product.data.image_url,
    price: product.data.full_price,
    description: product.data.description,
    purchasable,
    variants: product?.data?.swatches?.map((variant) => {
      return {
        id: `${Math.random() * 100}`,
        productId: product.data.id,
        colorName: variant.color_name,
        price: variant.current_price,
        imageUrl: variant.primary_image_url,
        hoverImageUrl: variant.hover_image_url || "",
        swatchImageUrl: variant.swatch_image_url || "",
      };
    }),
  };
});

export default products;
