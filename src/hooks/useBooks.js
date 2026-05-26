import { useState, useEffect, useCallback } from 'react';
import { bookService } from '../services/bookService';
import toast from 'react-hot-toast';

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // ─── Fetch all books ──────────────────────────────────────────────────────
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookService.getAll();
      setBooks(data);
    } catch (err) {
      const message = err.message || 'Failed to load books.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // ─── Create ───────────────────────────────────────────────────────────────
  const createBook = useCallback(async (data) => {
    setActionLoading(true);
    try {
      const newBook = await bookService.create(data);
      setBooks(prev => [newBook, ...prev]);
      toast.success(`"${newBook.title}" added successfully!`);
      return true;
    } catch (err) {
      const message = err.message || 'Failed to create book.';
      toast.error(message);
      return false;
    } finally {
      setActionLoading(false);
    }
  }, []);

  // ─── Update ───────────────────────────────────────────────────────────────
  const updateBook = useCallback(async (id, data) => {
    setActionLoading(true);
    try {
      const updated = await bookService.update(id, data);
      setBooks(prev => prev.map(b => (b.id === id ? updated : b)));
      toast.success(`"${updated.title}" updated successfully!`);
      return true;
    } catch (err) {
      const message = err.message || 'Failed to update book.';
      toast.error(message);
      return false;
    } finally {
      setActionLoading(false);
    }
  }, []);

  // ─── Delete ───────────────────────────────────────────────────────────────
  const deleteBook = useCallback(async (id) => {
    const book = books.find(b => b.id === id);
    setActionLoading(true);
    try {
      await bookService.delete(id);
      setBooks(prev => prev.filter(b => b.id !== id));
      toast.success(`"${book?.title || 'Book'}" deleted.`);
      return true;
    } catch (err) {
      const message = err.message || 'Failed to delete book.';
      toast.error(message);
      return false;
    } finally {
      setActionLoading(false);
    }
  }, [books]);

  // ─── Reset to seed data (Optional, good for local testing) ──────────────
  const resetBooks = useCallback(async () => {
    setActionLoading(true);
    try {
      if(bookService.reset) {
        const data = await bookService.reset();
        setBooks(data);
        toast.success('Library reset to default books!');
      } else {
         toast.error('Reset method not available on live backend.');
      }
    } catch (err) {
      const message = err.message || 'Failed to reset books.';
      toast.error(message);
    } finally {
      setActionLoading(false);
    }
  }, []);

  // ─── Client-side filtering & sorting ─────────────────────────────────────
  const getFilteredBooks = useCallback((filters) => {
    let result = [...books];

    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        b =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q)
      );
    }

    // Genre filter
    if (filters.genre !== 'All') {
      result = result.filter(b => b.genre === filters.genre);
    }

    // Sort
    result.sort((a, b) => {
      let valA = a[filters.sortBy];
      let valB = b[filters.sortBy];
      
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      
      if (valA < valB) return filters.sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [books]);

  return {
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
  };
}