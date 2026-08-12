export interface ProductImage {
  src: string;
  alt: string;
}

export interface UsageMethod {
  id: string;
  title: string;
  hairType: string;
  description: string;
}

export interface IngredientItem {
  name: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: "EUR";
  images: ProductImage[];
  highlights: string[];
  usageMethods: UsageMethod[];
  ingredients: IngredientItem[];
  rating: number;
  reviewCount: number;
}
