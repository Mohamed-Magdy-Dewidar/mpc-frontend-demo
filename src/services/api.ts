import { type CreateProductForm , type ProductResponse } from "../types";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


// in case of fetch failure, return mock data
const MOCK_PRODUCTS: ProductResponse[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    price: 19.99,
    category: "Apparel",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    variants: ["S", "M", "L"],
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Running Shoes",
    price: 129.99,
    category: "Footwear",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    inStock: false,
    variants: ["8", "9", "10"],
    createdAt: new Date(),
  }
];

export const fetchProducts = async (category?: string): Promise<ProductResponse[]> => {
  try {
    // Construct URL: if category is provided and not "All", add query param
    const url = category && category !== "All"
      ? `${API_URL}/products?category=${encodeURIComponent(category)}`
      : `${API_URL}/products`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Fetch failed, falling back to empty/mock data", error);
    return []; 
  }
};


export const createProduct = async (data: CreateProductForm): Promise<ProductResponse> => {
  const formData = new FormData();
  
  formData.append("name", data.name);
  formData.append("price", data.price.toString()); // Convert number to string
  formData.append("category", data.category);
  
  formData.append("variants", JSON.stringify(data.variants));
  
  formData.append("image", data.image); 

  const response = await fetch(`${API_URL}/products`, {
    method: "POST",    
    body: formData, 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create product");
  }

  return await response.json();
};