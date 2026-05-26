import React from 'react';
import { BookOpen, Plus, SearchX } from 'lucide-react';
import './EmptyState.css';

export default function EmptyState({ hasFilters, onAddBook, onClearFilters }) {
  if (hasFilters) {
    return (
      <div className="empty-state-container">
        <div className="empty-icon-wrapper filter-icon-bg">
          <SearchX className="icon-large text-slate-400" />
        </div>
        <h3 className="empty-title">No books found</h3>
        <p className="empty-subtitle">
          No books match your current search or filter criteria. Try adjusting your filters.
        </p>
        <button onClick={onClearFilters} className="btn-empty btn-clear">
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="empty-state-container">
      <div className="library-icon-container">
        <div className="empty-icon-wrapper library-icon-bg">
          <BookOpen className="icon-huge text-indigo-400" />
        </div>
        <div className="library-icon-badge">
          <Plus className="icon-tiny" />
        </div>
      </div>
      <h3 className="empty-title">Your library is empty</h3>
      <p className="empty-subtitle">
        Start building your personal book collection by adding your first book.
      </p>
      <button onClick={onAddBook} className="btn-empty btn-add">
        <Plus className="icon-small" />
        Add Your First Book
      </button>
    </div>
  );
}