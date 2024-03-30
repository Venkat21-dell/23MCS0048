import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Filters from './Filters';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    category: '',
    company: '',
    rating: '',
    priceRange: { min: 0, max: Infinity },
    availability: '',
  });

  // Fetch products from the test server API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      // Replace with your API call logic
      const response = await fetch('http://localhost:3000/api/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data); // Initially set filtered products to all products
    };

    fetchProducts();
  }, []);

  // Update filtered products based on selected filters
  const handleFilterChange = (updatedFilters) => {
    setFilterOptions(updatedFilters);

    const filteredProducts = products.filter((product) => {
      let isValid = true;

      // Implement filtering logic based on selected options
      if (updatedFilters.category && product.category !== updatedFilters.category) {
        isValid = false;
      }

      // ...similar logic for company, rating, priceRange, availability

      return isValid;
    });

    setFilteredProducts(filteredProducts);
  };

  return (
    <div className="App">
      <Filters onFilterChange={handleFilterChange} />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default App;

