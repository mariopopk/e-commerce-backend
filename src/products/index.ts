import newProducts from "./new";
import { v4 as uuid } from "uuid";

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  description: string;
  purchasable: boolean;
  variants: ProductVariant[] | undefined;
  options: ProductOption[] | undefined;
}

export interface ProductVariant {
  id: string;
  productId: string;
  colorName: string;
  price: number;
  imageUrl: string;
  hoverImageUrl: string;
  swatchImageUrl: string;
}

export interface ProductOption {
  id: string;
  productId: string;
  name: string;
  category: string;
  labels: string[];
  count?: number[];
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

  const productId = uuid();

  return {
    id: productId,
    categoryId: product.categoryId,
    name: product.value,
    slug: product.data.url,
    imageUrl: product.data.image_url,
    price: product.data.full_price,
    description: product.data.description,
    purchasable,
    options: createOption(product.categoryId, productId),
    variants: product?.data?.swatches?.map((variant) => {
      const variantId = uuid();

      return {
        id: variantId,
        productId: productId,
        colorName: variant.color_name,
        price: variant.current_price,
        imageUrl: variant.primary_image_url,
        hoverImageUrl: variant.hover_image_url || "",
        swatchImageUrl: variant.swatch_image_url || "",
      };
    }),
  };
});

function createOption(categoryId: string, productId: string): ProductOption[] {
  switch (categoryId) {
    case "101":
      // pants
      return [
        {
          id: uuid(),
          name: "Waist",
          productId,
          category: "size",
          labels: [
            "28",
            "29",
            "30",
            "31",
            "32",
            "33",
            "34",
            "35",
            "36",
            "38",
            "40",
            "42",
            "44",
            "46",
            "48",
            "50",
            "52",
            "54",
          ],
        },
        {
          id: uuid(),
          name: "Length",
          productId,
          category: "size",
          labels: ["28", "30", "32", "34", "36"],
        },
        {
          id: uuid(),
          name: "Fit",
          productId,
          category: "fit",
          labels: ["Skinny", "Slim", "Athletic", "Straight", "Slim Taper"],
        },
      ];
    case "102":
    case "103":
    case "106":
      //shirts
      return [
        {
          id: uuid(),
          name: "Size",
          productId,
          category: "size",
          labels: ["XS", "S", "M", "L", "XL", "XXL"],
        },
        {
          id: uuid(),
          name: "Fit",
          productId,
          category: "fit",
          labels: ["Slim", "Tailored", "Athletic", "Prominent"],
        },
      ];
    case "104":
      // Outerwear
      return [
        {
          id: uuid(),
          name: "Size",
          productId,
          category: "size",
          labels: ["XS", "S", "M", "L", "XL", "XXL"],
        },
        {
          id: uuid(),
          name: "Fit",
          productId,
          category: "fit",
          labels: ["Standard", "Slim"],
        },
      ];
    case "105":
      // Shorts
      return [
        {
          id: uuid(),
          name: "Size",
          productId,
          category: "size",
          labels: ["XS", "S", "M", "L", "XL", "XXL"],
        },
        {
          id: uuid(),
          name: "Fit",
          productId,
          category: "fit",
          labels: ["Slim", "Athletic", "Standard", "One Fit"],
        },
      ];
    case "108":
      // Blazers
      return [
        {
          id: uuid(),
          name: "Fit",
          productId,
          category: "fit",
          labels: ["Tailored", "Slim", "Athletic", "Standard", "Prominent"],
        },
        {
          id: uuid(),
          name: "Size",
          productId,
          category: "size",
          labels: [
            "36R",
            "36S",
            "38R",
            "38S",
            "40L",
            "40R",
            "40S",
            "42L",
            "42R",
            "42S",
            "44L",
            "44R",
            "46L",
            "46R",
          ],
        },
      ];
    case "109":
      // Accessories
      return [
        {
          id: uuid(),
          name: "Size",
          productId,
          category: "size",
          labels: ["Unisize"],
        },
      ];
    default:
      return [];
  }
}

export default products;
