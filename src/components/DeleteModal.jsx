import React from 'react';
import { AlertTriangle, Loader2, Trash2, X } from 'lucide-react';
import './DeleteModal.css';

export default function DeleteModal({ book, onConfirm, onClose, loading }) {
  if (!book) return null;

  return (
    <div className="delete-overlay">
      {/* Backdrop */}
      <div
        className="delete-backdrop"
        onClick={!loading ? onClose : undefined}
      />

      {/* Modal */}
      <div className="delete-modal">
        {/* Header accent */}
        <div className="delete-accent" />

        <div className="delete-content">
          {/* Close */}
          <button
            onClick={onClose}
            disabled={loading}
            className="delete-close-btn"
          >
            <X className="icon-small" />
          </button>

          {/* Icon */}
          <div className="delete-icon-wrapper">
            <AlertTriangle className="icon-large text-danger" />
          </div>

          <h3 className="delete-title">Delete Book</h3>
          <p className="delete-subtitle">
            Are you sure you want to delete{' '}
            <span className="font-semibold">"{book.title}"</span> by{' '}
            <span className="font-medium">{book.author}</span>? This action cannot
            be undone.
          </p>

          {/* Book preview */}
          <div className="delete-preview">
            <div
              className="preview-avatar"
              style={{ backgroundColor: book.coverColor || '#4f46e5' }}
            >
              <span className="preview-initial">
                {book.title ? book.title.charAt(0) : '?'}
              </span>
            </div>
            <div className="preview-text-container">
              <p className="preview-title">{book.title}</p>
              <p className="preview-meta">
                {book.author} &middot; {book.genre} &middot; {book.publicationYear}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="delete-actions">
            <button
              onClick={onClose}
              disabled={loading}
              className="btn-modal btn-cancel"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="btn-modal btn-danger"
            >
              {loading ? (
                <>
                  <Loader2 className="icon-small spinner" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="icon-small" />
                  Delete Book
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}