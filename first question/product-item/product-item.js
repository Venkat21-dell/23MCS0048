import React from 'react';

const ProductItem = ({ product }) => {
  // Handle product details navigation logic here
  const handleClick = () => {
    // Navigate to product details page
  };

  return (
    <div className="product-item" onClick={handleClick}>
      <img src="https://via.placeholder.com/150" alt={product.name} />
      <div className="product-info">
        <h4>{product.name}</h4>
        <p>{product.company}</p>
        {/* Display other product details like category, price, rating, etc. */}
      </div>
    </div>
  );
};

export default ProductItem;
