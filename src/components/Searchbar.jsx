import { useState } from 'react';
import PropTypes from 'prop-types';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import './Searchbar.css';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); 
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar-container">
      <div className="search-bar-input-wrapper">
        <MagnifyingGlassIcon className="search-bar-icon" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="search-bar-input"
        />
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
