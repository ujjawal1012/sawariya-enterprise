export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  specifications: Record<string, string>;
  inStock: boolean;
  rating: number;
  reviews: number;
  brand: string;
  additionalImages?: any ; // Allow both string URLs and File objects for additional images
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}