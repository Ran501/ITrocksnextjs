'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSort, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './ProductFilters.css';

const ProductFilters = ({ onFilterChange, onSortChange }) => {
  const [priceRange, setPriceRange] = useState({ min: "0", max: "2500" });
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('price-low');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updatedCategories);
    onFilterChange({
      categories: updatedCategories,
      priceRange
    });
  };

  const handlePriceChange = (type, value) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    onFilterChange({
      categories: selectedCategories,
      priceRange: newPriceRange
    });
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    onSortChange(value);
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div className="product-filters">
      <button className="filter-toggle" onClick={toggleFilters}>
        <FontAwesomeIcon icon={faFilter} /> Filters
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`chevron ${isFilterVisible ? 'rotate' : ''}`}
        />
      </button>

      <div className={`filter-content ${isFilterVisible ? 'show' : ''}`}>
        <div className="filter-section">
          <h3>Categories</h3>
          <div className="filter-group">
            <div className="category-options">
              {['jerseys', 'apparel', 'accessories'].map(category => (
                <label key={category} className="category-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Price Range</h3>
            <div className="price-inputs">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                placeholder="0"
                min="0"
              />
              <span>to</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                placeholder="2500"
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="sort-section">
          <h3><FontAwesomeIcon icon={faSort} /> Sort By</h3>
          <select value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters; 