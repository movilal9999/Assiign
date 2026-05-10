import { useState } from 'react';

export default function AddTransaction({ onAdd }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    amount: '',
    category: 'Food',
    description: ''
  });

  const categories = ['Food', 'Transport', 'Rent', 'Salary', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount) return;
    onAdd({
      ...form,
      amount: parseFloat(form.amount)
    });
    // Reset form
    setForm({
      date: new Date().toISOString().split('T')[0],
      type: 'expense',
      amount: '',
      category: 'Food',
      description: ''
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="md:col-span-1 p-3 border rounded-xl" />
        
        <div className="flex gap-2 md:col-span-1">
          <button type="button" onClick={() => setForm({...form, type: 'income'})} 
            className={`flex-1 py-3 rounded-xl font-medium ${form.type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>
            Income
          </button>
          <button type="button" onClick={() => setForm({...form, type: 'expense'})} 
            className={`flex-1 py-3 rounded-xl font-medium ${form.type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-100'}`}>
            Expense
          </button>
        </div>

        <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} 
          className="md:col-span-1 p-3 border rounded-xl" required />

        <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} 
          className="md:col-span-1 p-3 border rounded-xl">
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <input type="text" placeholder="Description (optional)" value={form.description} onChange={e => setForm({...form, description: e.target.value})} 
          className="md:col-span-2 p-3 border rounded-xl" />

        <button type="submit" className="md:col-span-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl">
          Add Transaction
        </button>
      </form>
    </div>
  );
}