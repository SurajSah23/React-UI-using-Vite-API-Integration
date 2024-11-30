import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/index";  
import SearchBar from "./Searchbar";
import useDebouncedSearch from "../api/useDebouncedSearch";  
import { Link } from "react-router-dom"; 
import "./ProductList.css";

export default function ProductList() {
  const [searchQuery, setSearchQuery] = useState("");

  // Use the custom debounced search hook
  const debouncedSearchQuery = useDebouncedSearch(searchQuery);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", debouncedSearchQuery],
    queryFn: () => fetchProducts(debouncedSearchQuery), 
    enabled: debouncedSearchQuery.length > 0 || !searchQuery, 
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  const filteredProducts = debouncedSearchQuery
    ? products.filter((product) =>
        product.title.toLowerCase().startsWith(debouncedSearchQuery.toLowerCase())  
      )
    : products;

  return (
    <div className="product-list-container">
      <SearchBar onSearch={setSearchQuery} /> {/* Pass the search setter to the SearchBar */}
      <div className="product-grid">
        {filteredProducts?.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="product-card"
          >
            <div className="product-image-container">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
            </div>
            <h2 className="product-title">{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <div className="product-info">
              <p className="product-price">${product.price}</p>
              <span className="product-brand">{product.brand}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
