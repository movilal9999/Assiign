const API_BASE = 'http://localhost:5000/api';

export const api = {
  getTransactions: async () => {
    const res = await fetch(`${API_BASE}/transactions`);
    return res.json();
  },

  addTransaction: async (data) => {
    const res = await fetch(`${API_BASE}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  deleteTransaction: async (id) => {
    const res = await fetch(`${API_BASE}/transactions/${id}`, { method: 'DELETE' });
    return res.json();
  },

  getSummary: async () => {
    const res = await fetch(`${API_BASE}/summary`);
    return res.json();
  }
};