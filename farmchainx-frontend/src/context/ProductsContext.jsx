import React, { createContext, useContext, useState, useEffect } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  // Initialize products from localStorage, fallback to default array
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts
      ? JSON.parse(savedProducts)
      : [
          {
            id: 1,
            name: "Wheat",
            status: "Farmer",
            category: "Grains",
            soilType: "Loamy",
            pesticide: "Glyphosate",
            harvestDate: "2025-08-01",
            gpsLocation: "12.9716° N, 77.5946° E",
            price: 100,
            image: "https://m.media-amazon.com/images/I/714xCG6CxKL._UF1000,1000_QL80_.jpg",
          },
          {
            id: 2,
            name: "Rice",
            status: "Retailer",
            category: "Grains",
            soilType: "Clay",
            pesticide: "Organic",
            harvestDate: "2025-07-15",
            gpsLocation: "28.7041° N, 77.1025° E",
            price: 200,
            image: "https://c.ndtvimg.com/2023-08/brlp7gk_uncooked-rice-or-rice-grains_625x300_18_August_23.jpg",
          },
          {
            id: 3,
            name: "Tomato",
            status: "Farmer",
            category: "Vegetables",
            soilType: "Sandy",
            pesticide: "Organic",
            harvestDate: "2025-08-10",
            gpsLocation: "19.0760° N, 72.8777° E",
            price: 25,
            image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
          },
          
        ];
  });

  // Persist products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
