import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../api';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id)
  });

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">Error: {error.message}</div>;

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-image-container">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-thumbnail"
          />
          <div className="product-images">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} ${index + 1}`}
                className="product-image-thumbnail"
              />
            ))}
          </div>
        </div>
        <div className="product-info">
          <div className="product-header">
            <h1 className="product-title">{product.title}</h1>
            <span className="product-brand">{product.brand}</span>
          </div>
          <p className="product-description">{product.description}</p>
          <div className="product-price-stock">
            <p className="product-price">${product.price}</p>
            <span className="product-stock">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          <div className="product-rating">
            <span className="product-rating-star">★</span>
            <span>{product.rating}/5</span>
          </div>
          <button className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
