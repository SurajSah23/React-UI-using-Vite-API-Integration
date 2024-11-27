import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api';
import SearchBar from './Searchbar';
import './ProductList.css'; 
import { useState } from 'react';

export default function ProductList() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', searchQuery],
    queryFn: () => fetchProducts(searchQuery)
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="product-list-container">
      <SearchBar onSearch={setSearchQuery} />
      <div className="product-grid">
        {products?.map((product) => (
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
