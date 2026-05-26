import React from 'react';
import { Edit2, Trash2, Star, BookOpen, Calendar, User, Hash } from 'lucide-react';
import './BookCard.css';

function StarRating({ rating }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map(star => {
        let starClass = 'star-empty';
        if (rating >= star) starClass = 'star-full';
        else if (rating >= star - 0.5) starClass = 'star-half';

        return <Star key={star} className={`star-icon ${starClass}`} />;
      })}
      <span className="star-text">{Number(rating).toFixed(1)}</span>
    </div>
  );
}

export default function BookCard({ book, onEdit, onDelete, viewMode }) {
  const fallbackColor = '#4f46e5'; 

  if (viewMode === 'list') {
    return (
      <div className="card-list">
        {/* Spine / Cover */}
        <div 
          className="list-spine" 
          style={{ backgroundColor: book.coverColor || fallbackColor }}
        >
          <BookOpen className="icon-large opacity-80" />
        </div>

        {/* Info */}
        <div className="list-info">
          <div className="list-header">
            <div className="title-author-group">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">
                <User className="icon-small" />
                {book.author}
              </p>
            </div>
            <div className="badge-container">
              <span 
                className="genre-badge"
                style={{ 
                  backgroundColor: `${book.coverColor || fallbackColor}20`, 
                  color: book.coverColor || fallbackColor 
                }}
              >
                {book.genre}
              </span>
            </div>
          </div>

          <div className="list-meta">
            <StarRating rating={book.rating || 0} />
            <span className="meta-item">
              <Calendar className="icon-small" />
              {book.publicationYear}
            </span>
            <span className="meta-item">
              <Hash className="icon-small" />
              {book.pages} pages
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="list-actions">
          <button onClick={() => onEdit(book)} className="btn-icon btn-edit" title="Edit">
            <Edit2 className="icon-medium" />
          </button>
          <button onClick={() => onDelete(book)} className="btn-icon btn-delete" title="Delete">
            <Trash2 className="icon-medium" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-grid">
      {/* Book Cover */}
      <div 
        className="grid-cover" 
        style={{ backgroundColor: book.coverColor || fallbackColor }}
      >
        <div className="cover-stripes">
          <div className="stripe stripe-thick" />
          <div className="stripe stripe-thin" />
        </div>

        <div className="cover-center">
          <BookOpen className="icon-huge opacity-70" />
        </div>

        <div className="grid-badge-wrapper">
          <span className="grid-badge">{book.genre}</span>
        </div>

        <div className="grid-actions-overlay">
          <button onClick={() => onEdit(book)} className="btn-floating btn-edit-float" title="Edit">
            <Edit2 className="icon-small" />
          </button>
          <button onClick={() => onDelete(book)} className="btn-floating btn-delete-float" title="Delete">
            <Trash2 className="icon-small" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid-content">
        <h3 className="book-title clamped-title">{book.title}</h3>
        <p className="book-author mb-custom">
          <User className="icon-small" />
          <span className="truncate-text">{book.author}</span>
        </p>

        <p className="book-description">
          {book.description || "No description provided."}
        </p>

        <div className="grid-footer">
          <StarRating rating={book.rating || 0} />
          <div className="grid-meta-group">
            <span className="meta-item">
              <Calendar className="icon-small" />
              {book.publicationYear}
            </span>
            <span className="meta-item">
              <Hash className="icon-small" />
              {book.pages}p
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}