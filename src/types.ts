export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  variants: string[];
}

export interface CreateProductRequest {
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock?: boolean;
  variants?: string[];
}

export interface ProductResponse {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  variants: string[];
  createdAt: Date;
}

export interface CreateProductForm {
  name: string;
  price: number;
  category: string;
  image: File;   
  variants: string[];
}

export interface CreateProductRequest {
  name: string;
  price: number;
  category: string;
  imageUrl: string; 
  inStock?: boolean;
  variants?: string[];
}