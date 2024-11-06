import React, { useState, useEffect } from 'react';
import productsData from './data';
import useDebounce from './hooks/useDebounce';
import ProductCard from './components/ProductCard';
import FilterPanel from './components/FilterPanel';
import ClipLoader from 'react-spinners/ClipLoader';
import './App.css';

const App = () => {
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortOption, setSortOption] = useState(''); // Track selected sort option
  const [loading, setLoading] = useState(false);
  
  const debouncedCategory = useDebounce(category, 300);
  const debouncedBrand = useDebounce(brand, 300);

  // Function to handle filtering logic
  const filterProducts = () => {
    const results = products.filter(product => {
      const inCategory = debouncedCategory ? product.category.toLowerCase().includes(debouncedCategory.toLowerCase()) : true;
      const inBrand = debouncedBrand ? product.brand.toLowerCase().includes(debouncedBrand.toLowerCase()) : true;
      const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      return inCategory && inBrand && inPriceRange;
    });
    return results;
  };

  // Function to handle sorting logic
  const sortProducts = (filtered) => {
    if (!sortOption) return filtered;

    let sortedProducts = [...filtered]; // Create a copy to sort
    switch (sortOption) {
      case 'priceAsc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'ratingAsc':
        sortedProducts.sort((a, b) => a.rating - b.rating);
        break;
      case 'ratingDesc':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return sortedProducts;
  };

  // Filter and sort products when category, brand, priceRange or sortOption changes
  useEffect(() => {
    setLoading(true);
    
    // First filter based on search criteria (category, brand, price)
    let filtered = filterProducts();
    
    // Then apply sorting
    let sorted = sortProducts(filtered);

    // Update the filtered and sorted products
    setFilteredProducts(sorted);
    setLoading(false);
  }, [debouncedCategory, debouncedBrand, priceRange, sortOption, products]); // Depend on sortOption too

  // Local Storage for Preferences
  useEffect(() => {
    const storedCategory = localStorage.getItem('category');
    const storedBrand = localStorage.getItem('brand');
    const storedPriceRange = JSON.parse(localStorage.getItem('priceRange'));

    if (storedCategory) setCategory(storedCategory);
    if (storedBrand) setBrand(storedBrand);
    if (storedPriceRange) setPriceRange(storedPriceRange);
  }, []);

  useEffect(() => {
    localStorage.setItem('category', category);
    localStorage.setItem('brand', brand);
    localStorage.setItem('priceRange', JSON.stringify(priceRange));
  }, [category, brand, priceRange]);

  return (
    <div className="app">
      <FilterPanel 
        category={category}
        setCategory={setCategory}
        brand={brand}
        setBrand={setBrand}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortOption={sortOption}  // Pass sortOption to FilterPanel
        setSortOption={setSortOption} // Pass setSortOption to update sort option
      />
      <main>
        {loading ? (
          <ClipLoader loading={loading} size={50} />
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </main>
    </div>
  );
};

export default App;
