import React from 'react';
import { Search, SlidersHorizontal, ChevronDown, ArrowUpDown, X } from 'lucide-react';
import { GENRES } from '../services/bookService';
import './Filters.css';

const SORT_OPTIONS = [
  { value: 'title', label: 'Title' },
  { value: 'author', label: 'Author' },
  { value: 'publicationYear', label: 'Year' },
  { value: 'rating', label: 'Rating' },
];

export default function Filters({ filters, onFiltersChange, totalBooks, filteredCount }) {
  const update = (partial) => {
    onFiltersChange({ ...filters, ...partial });
  };

  const hasActiveFilters = filters.search || filters.genre !== 'All';

  const clearFilters = () => {
    onFiltersChange({
      ...filters,
      search: '',
      genre: 'All',
    });
  };

  return (
    <div className="filters-container">
      {/* Search + Sort row */}
      <div className="filters-top-row">
        {/* Search */}
        <div className="search-wrapper">
          <Search className="search-icon icon-small" />
          <input
            type="text"
            value={filters.search}
            onChange={e => update({ search: e.target.value })}
            placeholder="Search by title or author..."
            className="filter-input"
          />
          {filters.search && (
            <button
              onClick={() => update({ search: '' })}
              className="search-clear-btn"
              title="Clear search"
            >
              <X className="icon-small" />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="sort-wrapper">
          <div className="sort-select-container">
            <ArrowUpDown className="sort-icon-left icon-small" />
            <select
              value={filters.sortBy}
              onChange={e => update({ sortBy: e.target.value })}
              className="filter-select"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>Sort: {opt.label}</option>
              ))}
            </select>
            <ChevronDown className="sort-icon-right icon-tiny" />
          </div>

          <button
            onClick={() => update({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
            title={`Sort ${filters.sortOrder === 'asc' ? 'descending' : 'ascending'}`}
            className={`sort-direction-btn ${filters.sortOrder === 'desc' ? 'sort-desc' : 'sort-asc'}`}
          >
            <svg 
              className={`icon-small transition-transform ${filters.sortOrder === 'desc' ? 'flip-y' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth={2} 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Genre chips */}
      <div className="genre-row">
        <div className="genre-label">
          <SlidersHorizontal className="icon-tiny" />
          <span>Genre:</span>
        </div>
        <div className="genre-chips">
          <button
            onClick={() => update({ genre: 'All' })}
            className={`genre-chip ${filters.genre === 'All' ? 'genre-chip-active' : 'genre-chip-default'}`}
          >
            All
          </button>
          {GENRES.map(genre => (
            <button
              key={genre}
              onClick={() => update({ genre })}
              className={`genre-chip ${filters.genre === genre ? 'genre-chip-active' : 'genre-chip-default'}`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Results & clear */}
      {(hasActiveFilters || filteredCount !== totalBooks) && (
        <div className="results-row">
          <p className="results-text">
            Showing <span className="font-semibold">{filteredCount}</span> of{' '}
            <span className="font-semibold">{totalBooks}</span> books
          </p>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="clear-filters-btn">
              <X className="icon-tiny" />
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}