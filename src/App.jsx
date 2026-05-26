import React, { useState, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  BookOpen,
  Plus,
  LayoutGrid,
  List,
  RefreshCw,
  Library,
} from 'lucide-react';

import { useBooks } from './hooks/useBooks';

import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import DeleteModal from './components/DeleteModal';
import Filters from './components/Filters';
import EmptyState from './components/EmptyState';
import LoadingSkeleton from './components/LoadingSkeleton';
import './App.css';

const DEFAULT_FILTERS = {
  search: '',
  genre: 'All',
  sortBy: 'title',
  sortOrder: 'asc',
};

export default function App() {
  // ─── Book Data ──────────────────────────────────────────────────────────────
  const {
    books,
    loading,
    error,
    actionLoading,
    fetchBooks,
    createBook,
    updateBook,
    deleteBook,
    resetBooks,
    getFilteredBooks,
  } = useBooks();

  // ─── UI State ───────────────────────────────────────────────────────────────
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // Modal states
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);

  // ─── Derived ────────────────────────────────────────────────────────────────
  const filteredBooks = useMemo(() => getFilteredBooks(filters), [getFilteredBooks, filters]);
  const hasActiveFilters = filters.search !== '' || filters.genre !== 'All';

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const handleOpenAdd = () => {
    setEditingBook(null);
    setShowForm(true);
  };

  const handleOpenEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  const handleSubmitForm = async (data) => {
    if (editingBook) {
      return updateBook(editingBook.id, data);
    }
    return createBook(data);
  };

  const handleOpenDelete = (book) => {
    setDeletingBook(book);
  };

  const handleConfirmDelete = async () => {
    if (!deletingBook) return;
    const ok = await deleteBook(deletingBook.id);
    if (ok) setDeletingBook(null);
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="app-container">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            borderRadius: '12px',
            fontSize: '13px',
            boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)',
          },
          success: {
            iconTheme: { primary: '#34d399', secondary: '#1e293b' },
          },
          error: {
            iconTheme: { primary: '#f87171', secondary: '#1e293b' },
          },
        }}
      />

      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-content">
            {/* Logo */}
            <div className="brand-group">
              <div className="brand-icon">
                <Library className="icon-medium text-white" />
              </div>
              <div className="brand-text">
                <h1 className="brand-title">BookShelf</h1>
                <p className="brand-subtitle">Book Management</p>
              </div>
            </div>

            {/* Actions */}
            <div className="header-actions">
              {/* Refresh */}
              <button
                onClick={fetchBooks}
                disabled={loading || actionLoading}
                title="Refresh"
                className="btn-header btn-refresh"
              >
                <RefreshCw className={`icon-small ${loading ? 'animate-spin' : ''}`} />
              </button>

              {/* View mode */}
              <div className="view-mode-toggle">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`view-mode-btn ${viewMode === 'grid' ? 'view-mode-active' : ''}`}
                  title="Grid view"
                >
                  <LayoutGrid className="icon-small" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`view-mode-btn ${viewMode === 'list' ? 'view-mode-active' : ''}`}
                  title="List view"
                >
                  <List className="icon-small" />
                </button>
              </div>

              {/* Add Book */}
              <button
                onClick={handleOpenAdd}
                disabled={loading}
                className="btn-header btn-add-book"
              >
                <Plus className="icon-small" />
                <span className="hidden-mobile">Add Book</span>
                <span className="visible-mobile">Add</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Main Content ───────────────────────────────────────────────────── */}
      <main className="app-main">
        {/* Hero banner */}
        <div className="hero-banner">
          {/* Decorative circles */}
          <div className="hero-circle circle-1" />
          <div className="hero-circle circle-2" />
          <div className="hero-circle circle-3" />

          <div className="hero-content">
            <div className="hero-text-block">
              <h2 className="hero-title">Your Personal Library</h2>
              <p className="hero-subtitle">
                Manage, search, and discover your book collection. Add new books, update details,
                and keep track of everything you've read or plan to read.
              </p>
            </div>
            <div className="hero-stats-block">
              <div className="hero-stats-text">
                <p className="hero-stats-number">{books.length}</p>
                <p className="hero-stats-label">Books</p>
              </div>
              <div className="hero-stats-icon">
                <BookOpen className="icon-large text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <Filters
            filters={filters}
            onFiltersChange={setFilters}
            totalBooks={books.length}
            filteredCount={filteredBooks.length}
          />
        </div>

        {/* Error state */}
        {error && !loading && (
          <div className="error-state">
            <div className="error-icon-wrapper">
              <svg className="icon-large text-danger" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h3 className="error-title">Failed to load books</h3>
            <p className="error-subtitle">{error}</p>
            <button onClick={fetchBooks} className="btn-error">
              <RefreshCw className="icon-small" />
              Try Again
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && <LoadingSkeleton viewMode={viewMode} />}

        {/* Empty state */}
        {!loading && !error && filteredBooks.length === 0 && (
          <EmptyState
            hasFilters={hasActiveFilters}
            onAddBook={handleOpenAdd}
            onClearFilters={handleClearFilters}
          />
        )}

        {/* Books grid / list */}
        {!loading && !error && filteredBooks.length > 0 && (
          <div className={viewMode === 'grid' ? 'book-grid' : 'book-list'}>
            {filteredBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

       {/* Footer */}
        <footer className="app-footer footer-container">
          <div className="footer-section">
            <p>&copy; 2026 Book Management System. All Rights Reserved.</p>
            <p>Version 1.0.0 | Built by Ishwari Pusadkar</p>
          </div>
        </footer>
      </main>

      {/* ─── Modals ─────────────────────────────────────────────────────────── */}
      {showForm && (
        <BookForm
          book={editingBook}
          onSubmit={handleSubmitForm}
          onClose={handleCloseForm}
          loading={actionLoading}
        />
      )}

      {deletingBook && (
        <DeleteModal
          book={deletingBook}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeletingBook(null)}
          loading={actionLoading}
        />
      )}
    </div>
  );
}