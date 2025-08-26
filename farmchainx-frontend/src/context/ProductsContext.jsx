import React, { createContext, useContext, useState } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([
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
      image: "https://m.media-amazon.com/images/I/714xCG6CxKL._UF1000,1000_QL80_.jpg", // can be a URL or empty
    },
    {
      id: 2,
      name: "Rice",
      status: "Retailer",
      category: "Grains",
      soilType: "Clay",
      pesticide: "Orgainc",
      harvestDate: "2025-07-15",
      gpsLocation: "28.7041° N, 77.1025° E",
      price: 200,
      image: "https://c.ndtvimg.com/2023-08/brlp7gk_uncooked-rice-or-rice-grains_625x300_18_August_23.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=738",
    },
    {
      id: 3,
      name: "Tomato",
      status: "Farmer",
      category: "Vegetables",
      soilType: "Sandy",
      pesticide: "Orgainc",
      harvestDate: "2025-08-10",
      gpsLocation: "19.0760° N, 72.8777° E",
      price: 25,
      image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Tomato_je.jpg",
    }
  ]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
