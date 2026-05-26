const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.warn("API_URL is missing. Make sure you added VITE_API_URL to your .env file!");
}

// ─── Helper to handle network responses ───────────────────────────────────────
async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || `Network error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// ─── CRUD API ─────────────────────────────────────────────────────────────────
export const bookService = {
  /** GET /books */
  async getAll() {
    const response = await fetch(API_URL);
    return handleResponse(response);
  },

  /** GET /books/:id */
  async getById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    return handleResponse(response);
  },

  /** POST /books */
  async create(data) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });
    return handleResponse(response);
  },

  /** PUT /books/:id */
  async update(id, data) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        updatedAt: new Date().toISOString(),
      }),
    });
    return handleResponse(response);
  },

  /** DELETE /books/:id */
  async delete(id) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

// ─── Shared Constants ────────────────────────────────────────────────────────

export const GENRES = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Thriller',
  'Romance',
  'Horror',
  'Biography',
  'History',
  'Self-Help',
  'Science',
  'Philosophy',
  'Poetry',
  'Children',
];

export const COVER_COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f97316',
  '#f59e0b', '#d97706', '#10b981', '#0ea5e9', '#3b82f6',
  '#14b8a6', '#dc2626', '#0891b2', '#7c3aed', '#be185d',
];

