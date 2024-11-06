// src/components/FilterPanel.js
import React, { useState } from 'react';

const FilterPanel = ({
  category,
  setCategory,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  sortOption,
  setSortOption,
}) => {
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);

  const handlePriceChange = () => {
    setPriceRange([Number(minPrice), Number(maxPrice)]);
  };

  return (
    <aside className="filter-panel">
      <h2 className="filter-panel-title">Filters</h2>
      <div className="filter-group">
        <label>Category</label>
        <input
          type="text"
          placeholder="Search by category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>Brand</label>
        <input
          type="text"
          placeholder="Search by brand..."
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>Price Range</label>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={handlePriceChange}
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={handlePriceChange}
          />
        </div>
      </div>
      <div className="filter-group">
        <label>Sort By</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">None</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="ratingAsc">Rating: Low to High</option>
          <option value="ratingDesc">Rating: High to Low</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterPanel;
