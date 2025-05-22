'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      {product.discount > 0 && (
        <div className="discount-tag">-{product.discount}%</div>
      )}
      <div className="product-image">
        <Image 
          src={product.image} 
          alt={product.title}
          width={200}
          height={200}
        />
      </div>
      <div className="product-info">
        <h3>{product.title}</h3>
        <div className="product-price">
          {product.originalPrice && (
            <del>Nu.{product.originalPrice}</del>
          )}
          <strong>Nu.{product.price}</strong>
        </div>
      </div>
      <button 
        className="add-to-cart"
        onClick={() => onAddToCart(product)}
      >
        <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard; 