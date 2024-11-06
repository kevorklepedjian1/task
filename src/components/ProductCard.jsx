import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <article className="product-card">
      <img 
        src={product.imageUrl} 
        alt={product.name} 
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p>{product.category}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-rating">{product.rating} ⭐</p>
      </div>
    </article>
  );
};

export default ProductCard;
