import React, { useState, useEffect } from 'react';
import { X, BookOpen, Save, Loader2 } from 'lucide-react';
import { GENRES, COVER_COLORS } from '../services/bookService';
import './BookForm.css';

const CURRENT_YEAR = new Date().getFullYear();

const DEFAULT_FORM = {
  title: '',
  author: '',
  genre: 'Fiction',
  publicationYear: CURRENT_YEAR,
  description: '',
  coverColor: COVER_COLORS[0],
  rating: 4.0,
  pages: 200,
};

export default function BookForm({ book, onSubmit, onClose, loading }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});

  const isEdit = !!book;

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        genre: book.genre,
        publicationYear: book.publicationYear,
        description: book.description,
        coverColor: book.coverColor,
        rating: book.rating,
        pages: book.pages,
      });
    } else {
      setForm(DEFAULT_FORM);
    }
    setErrors({});
  }, [book]);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required.';
    if (!form.author.trim()) newErrors.author = 'Author is required.';
    if (!form.genre) newErrors.genre = 'Genre is required.';
    if (!form.publicationYear || form.publicationYear < 1000 || form.publicationYear > CURRENT_YEAR) {
      newErrors.publicationYear = `Year must be between 1000 and ${CURRENT_YEAR}.`;
    }
    if (!form.description.trim()) newErrors.description = 'Description is required.';
    if (form.rating < 0 || form.rating > 5) newErrors.rating = 'Rating must be between 0 and 5.';
    if (form.pages < 1) newErrors.pages = 'Pages must be at least 1.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const success = await onSubmit(form);
    if (success) onClose();
  };

  return (
    <div className="modal-overlay">
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-info">
            <div
              className="modal-icon-wrapper"
              style={{ backgroundColor: form.coverColor + '20' }}
            >
              <BookOpen className="icon-medium" style={{ color: form.coverColor }} />
            </div>
            <div>
              <h2 className="modal-title">{isEdit ? 'Edit Book' : 'Add New Book'}</h2>
              <p className="modal-subtitle">
                {isEdit ? 'Update book details' : 'Fill in the details to add a book'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn-close" title="Close">
            <X className="icon-medium" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Title & Author */}
          <div className="form-grid">
            <div className="form-group">
              <label>Title <span className="required">*</span></label>
              <input
                type="text"
                value={form.title}
                onChange={e => handleChange('title', e.target.value)}
                placeholder="e.g. The Great Gatsby"
                className={`form-control ${errors.title ? 'input-error' : ''}`}
              />
              {errors.title && <p className="error-text">{errors.title}</p>}
            </div>

            <div className="form-group">
              <label>Author <span className="required">*</span></label>
              <input
                type="text"
                value={form.author}
                onChange={e => handleChange('author', e.target.value)}
                placeholder="e.g. F. Scott Fitzgerald"
                className={`form-control ${errors.author ? 'input-error' : ''}`}
              />
              {errors.author && <p className="error-text">{errors.author}</p>}
            </div>
          </div>

          {/* Genre & Year */}
          <div className="form-grid">
            <div className="form-group">
              <label>Genre <span className="required">*</span></label>
              <select
                value={form.genre}
                onChange={e => handleChange('genre', e.target.value)}
                className={`form-control ${errors.genre ? 'input-error' : ''}`}
              >
                {GENRES.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              {errors.genre && <p className="error-text">{errors.genre}</p>}
            </div>

            <div className="form-group">
              <label>Publication Year <span className="required">*</span></label>
              <input
                type="number"
                value={form.publicationYear}
                onChange={e => handleChange('publicationYear', parseInt(e.target.value) || 0)}
                min={1000}
                max={CURRENT_YEAR}
                className={`form-control ${errors.publicationYear ? 'input-error' : ''}`}
              />
              {errors.publicationYear && <p className="error-text">{errors.publicationYear}</p>}
            </div>
          </div>

          {/* Rating & Pages */}
          <div className="form-grid">
            <div className="form-group">
              <label>Rating (0–5)</label>
              <input
                type="number"
                value={form.rating}
                onChange={e => handleChange('rating', parseFloat(e.target.value) || 0)}
                min={0}
                max={5}
                step={0.1}
                className={`form-control ${errors.rating ? 'input-error' : ''}`}
              />
              {errors.rating && <p className="error-text">{errors.rating}</p>}
            </div>

            <div className="form-group">
              <label>Pages</label>
              <input
                type="number"
                value={form.pages}
                onChange={e => handleChange('pages', parseInt(e.target.value) || 0)}
                min={1}
                className={`form-control ${errors.pages ? 'input-error' : ''}`}
              />
              {errors.pages && <p className="error-text">{errors.pages}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description <span className="required">*</span></label>
            <textarea
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="Brief description of the book..."
              rows={3}
              className={`form-control textarea-resize ${errors.description ? 'input-error' : ''}`}
            />
            {errors.description && <p className="error-text">{errors.description}</p>}
          </div>

          {/* Cover Color */}
          <div className="form-group">
            <label>Cover Color</label>
            <div className="color-picker-group">
              {COVER_COLORS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleChange('coverColor', color)}
                  className={`color-btn ${form.coverColor === color ? 'color-btn-active' : ''}`}
                  style={{
                    backgroundColor: color,
                    boxShadow: form.coverColor === color ? `0 0 0 3px white, 0 0 0 5px ${color}` : 'none'
                  }}
                  title={color}
                >
                  {form.coverColor === color && (
                    <span className="color-check">
                      <svg fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <Loader2 className="icon-small spinner" />
                  {isEdit ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  <Save className="icon-small" />
                  {isEdit ? 'Update Book' : 'Add Book'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}